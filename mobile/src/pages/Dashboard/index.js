import React, { useState, useMemo, useEffect } from 'react';
import {
  Alert,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';
import Logo from '~/assets/logo.png';
import { Background, Header } from '~/components/background';
import { Container, List, Nav, DateText } from './styles';

import Meetup from '~/components/meetup';

export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [meetups, setMeetups] = useState([]);
  const [page, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadPage, setIsLoadPage] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM 'de' yyyy", { locale: pt }),
    [date]
  );
  
  async function loadMeetups(loadPage = 1) {
    try {
      const response = await api.get('/meetups', {
        params: {
          page: loadPage,
          date,
        },
      });

      if (response.data.length === 0) {
        return;
      }
      if (loadPage !== 1) {
        const newMeetups = [...meetups, response.data];
        setMeetups(newMeetups);
      } else {
        setMeetups(response.data);
      }
    } catch (err) {
      Alert.alert('Ocurreu um erro durante a recuperação dos meetups');
    }
  }

  useEffect(() => {
    loadMeetups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
    setPage(1);
    setMeetups([]);
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
    setPage(1);
    setMeetups([]);
  }

  async function handleInscription(id) {
    try {
      const response = await api.post(`/subscription/${id}`);
	  
	  setMeetups(meetups.map(meetup => 
		meetup.id === id ? {
			...meetup,
			action_at: true
		} : meetup
	  ));
    } catch (err) {
      Alert.alert('Falhou a inscrição.');
    }
  }

  function loadMoreMeetups() {
    if (isLoadPage || isRefreshing) {
      return;
    }

    setIsLoadPage(true);
    loadMeetups(page + 1);
    setPage(page + 1);
    setIsLoadPage(false);
  }

  function handleFooter() {
    if (isLoadPage) {
      return <ActivityIndicator size={30} color="#333" />;
    }
    return null;
  }

  function refreshList() {
    if (isLoadPage || isRefreshing) {
      return;
    }

    setIsRefreshing(true);
    loadMeetups();
    setPage(1);
    setIsRefreshing(false);
  }

  return (
    <Background>
      <Header>
        <Image source={Logo} style={{ width: 30, height: 30 }} />
      </Header>
      <Container>
        <Nav>
          <TouchableOpacity onPress={handlePrevDay}>
            <Icon name="chevron-left" size={25} color="#fff" />
          </TouchableOpacity>
          <DateText>{dateFormatted}</DateText>
          <TouchableOpacity onPress={handleNextDay}>
            <Icon name="chevron-right" size={25} color="#fff" />
          </TouchableOpacity>
        </Nav>
        <List
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Meetup
              nameAction="Realizar inscrição"
              action={() => handleInscription(item.id)}
              data={item}
            />
          )}
          onEndReached={loadMoreMeetups}
          onEndReachedThreshold={0.1}
          ListFooterComponent={handleFooter}
          onRefresh={refreshList}
          refreshing={isRefreshing}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};
