import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdEdit, MdDeleteForever, MdToday, MdPlace } from 'react-icons/md';

import { Container, Datetime } from './styles';
import { deleteMeetupsRequest } from '~/store/modules/meetups/actions';

export default function Details() {
  const meetup = useSelector(state => state.Meetups.myMeetups);

  const dispatch = useDispatch();

  async function handleCancelMeetup() {
    dispatch(deleteMeetupsRequest(meetup.id));
  }

  return (
    <Container>
      <nav>
        <h1>{meetup.title}</h1>
        {!meetup.happened && (
          <div>
            <Link to="/edit-meetup">
              <button type="submit" id="edit">
                <MdEdit size="20" color="#fff" />
                <strong>Editar</strong>
              </button>
            </Link>
            <button type="submit" id="cancel" onClick={handleCancelMeetup}>
              <MdDeleteForever size="20" color="#fff" />
              <strong>Cancelar</strong>
            </button>
          </div>
        )}
      </nav>
      <main>
        <img src={meetup.Banner.url} alt="banner" />
        <p>{meetup.description}</p>
        <Datetime>
          <div>
            <MdToday size="15" color="#999" />
            <p>{meetup.dateFormatted}</p>
          </div>
          <div>
            <MdPlace size="15" color="#999" />
            <p>{meetup.location}</p>
          </div>
        </Datetime>
      </main>
    </Container>
  );
}
