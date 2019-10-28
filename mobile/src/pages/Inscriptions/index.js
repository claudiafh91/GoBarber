import React, { useState, useEffect } from 'react';
import { Alert, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';
import { Background, Header } from '~/components/background';
import Logo from '~/assets/logo.png';

import Meetup from '~/components/meetup';

import { Container, List } from './styles';

export default function Inscription() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadSubscriptions() {
      try {
        setLoading(true);

        const response = await api.get('/subscriptions');
        setSubscriptions(response.data);

        setLoading(false);
      } catch (err) {
        Alert.alert('Ocurreu um erro durante a recuperação das inscriçoes');
        setLoading(false);
      }
    }
    loadSubscriptions();
  }, []);

  async function cancelInscription(id) {
    try {
      await api.delete(`/canceled-subscription/${id}`);

      setSubscriptions(
        subscriptions.map(subscription =>
          subscription.id === id
            ? {
                ...subscription,
                action_at: true,
              }
            : subscription
        )
      );
    } catch (err) {
      Alert.alert('Falhou o cancelamento do inscrição.');
    }
  }

  return (
    <Background>
      <Header>
        <Image source={Logo} style={{ width: 30, height: 30 }} />
      </Header>
      <Container>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <List
            data={subscriptions}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Meetup
                nameAction="Cancel inscrição"
                action={() => cancelInscription(item.id)}
                data={item.Meetup}
              />
            )}
          />
        )}
      </Container>
    </Background>
  );
}

Inscription.navigationOptions = {
  headerTitle: <Image source={Logo} style={{ width: 30, height: 30 }} />,
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};
