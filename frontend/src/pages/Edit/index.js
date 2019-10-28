import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import * as Yup from 'yup';

import { Container } from './styles';
import {
  updateMeetupsRequest,
  addMeetupsRequest,
} from '~/store/modules/meetups/actions';

import Banner from './Banner';
import DatePicker from './DatePicker';

const schema = Yup.object().shape({
  title: Yup.string().required('O titulo do Meetup é obrigatório'),
  description: Yup.string().required('O descrição é obrigatório'),
  datetime: Yup.date().required('A data é obrigatória'),
  location: Yup.string().required('A localização é obrigatório'),
  bannerId: Yup.number().required('A imagen do Meetup é obrigatório'),
});

export default function Edit() {
  const meetup = useSelector(state => state.Meetups.myMeetups);

  const dispatch = useDispatch();

  function handleSubmit(data) {
    console.tron.log(data);

    if (meetup) {
      dispatch(updateMeetupsRequest(meetup.id, data));
    } else {
      dispatch(addMeetupsRequest(data));
    }
  }

  return (
    <Container>
      <Form initialData={meetup} schema={schema} onSubmit={handleSubmit}>
        <Banner name="bannerId" />
        <Input name="title" placeholder="Titulo do Meetup" />
        <Input multiline name="description" placeholder="Descrição completa" />
        <DatePicker name="datetime" />
        <Input name="location" placeholder="Localização do meetup" />
        <button type="submit">
          <MdAddCircleOutline size="20" color="#fff" />
          <strong>Salvar meetup</strong>
        </button>
      </Form>
    </Container>
  );
}
