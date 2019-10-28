import React from 'react';
import { useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Banner,
  Info,
  Title,
  Data,
  DataText,
  SubmitButton,
  Description,
} from './styles';

export default function meetup({ nameAction, action, data }) {
  const { profile } = useSelector(state => state.User);
  
  // const banner = `http://10.0.3.2:3333/banner/${data.Banner.path}`;
  const banner = data.Banner.url;

  const dateFormatted = format(
    parseISO(data.datetime),
    "'Dia' dd 'de' MMMM 'de' yyyy', às ' HH:mm'h'",
    { locale: pt }
  );
  
  return (
    <Container>
      <Banner source={{ uri: banner }} />
      <Info>
        <Title>{data.title}</Title>
        <Data>
          <Icon name="short-text" size={16} color="#999" />
          <Description>{data.description}</Description>
        </Data>
        <Data>
          <Icon name="today" size={16} color="#999" />
          <DataText>{dateFormatted}</DataText>
        </Data>
        <Data>
          <Icon name="place" size={16} color="#999" />
          <DataText>{data.location}</DataText>
        </Data>
        <Data>
          <Icon name="person" size={16} color="#999" />
          <DataText>Organizer: {data.User.name}</DataText>
        </Data>
        {!data.happened && profile.id !== data.User.id && !data.action_at && (
          <SubmitButton onPress={action}>{nameAction}</SubmitButton>
        )}
      </Info>
    </Container>
  );
}
