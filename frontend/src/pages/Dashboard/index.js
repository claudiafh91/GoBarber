import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdAddCircleOutline, MdNavigateNext } from 'react-icons/md';
import { toast } from 'react-toastify';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import ReactTooltip from 'react-tooltip';

import api from '~/services/api';
import { Container, Data, ActivityIndicator } from './styles';
import {
  addDetailsMeetups,
  cleanStateMeetup,
} from '~/store/modules/meetups/actions';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadMeetups() {
      try {
        setLoading(true);
        const response = await api.get('my-meetups');

        const data = response.data.map(meetup => ({
          ...meetup,
          dateFormatted: format(
            parseISO(meetup.datetime),
            "'Dia' dd 'de' MMMM 'de' yyyy', às ' HH:mm'h'",
            { locale: pt }
          ),
        }));

        setMeetups(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        toast.error('Falha na autenticação de meetups');
      }
    }
    loadMeetups();
  }, []);

  function showDetailsMeetup(id) {
    const meetup = meetups.find(element => {
      return element.id === id;
    });

    dispatch(addDetailsMeetups(meetup));
  }

  function addNewMeetup() {
    dispatch(cleanStateMeetup());
  }

  return (
    <Container>
      <nav>
        <h1>Meus meetups</h1>
        <Link to="/add-meetup">
          <button type="button" onClick={addNewMeetup}>
            <MdAddCircleOutline size="20" color="#fff" />
            <strong>Novo meetup</strong>
          </button>
        </Link>
      </nav>
      <main>
        {loading ? (
          <ActivityIndicator>Carregando...</ActivityIndicator>
        ) : (
          <ul>
            {meetups.map(meetup => (
              <Data key={meetup.id}>
                <strong>{meetup.title}</strong>
                <span>{meetup.dateFormatted}</span>
                <Link to="/meetup/details">
                  <button
                    id="details"
                    type="button"
                    data-tip="Veja detalhes do encontro"
                    onClick={() => showDetailsMeetup(meetup.id)}
                  >
                    <MdNavigateNext size="20" color="#fff" />
                  </button>
                  <ReactTooltip type="info" />
                </Link>
              </Data>
            ))}
          </ul>
        )}
      </main>
    </Container>
  );
}
