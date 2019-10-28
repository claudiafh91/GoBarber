import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import { cleanStateMeetup, updateMeetupsSuccess } from './actions';

export function* deleteMeetup({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `/canceled-meetup/${id}`);

    yield put(cleanStateMeetup());

    toast.success('Meetup cancelado com sucesso!');
    history.push('/dashboard');
  } catch (err) {
    toast.error(
      'Falha cancelando o meetup, verifique seus dados e tente novamente!'
    );
  }
}

export function* updateMeetup({ payload }) {
  try {
    const { id, data } = payload;

    const response = yield call(api.put, `/update-meetup/${id}`, data);

    yield put(updateMeetupsSuccess(response.data));

    toast.success('Meetup atualização com sucesso!');
  } catch (err) {
    toast.error(
      'Falha na atualização, verifique seus dados e tente novamente!'
    );
  }
}

export function* addMeetup({ payload }) {
  try {
    yield call(api.post, '/cadastro-meetup', payload.meetup);

    toast.success('Meetup cadastrado com sucesso!');
    history.push('/dashboard');
  } catch (err) {
    toast.error(
      'Falha cadastrando o meetup, verifique seus dados e tente novamente!'
    );
  }
}

export default all([
  takeLatest('@meetup/DELETE_REQUEST', deleteMeetup),
  takeLatest('@meetup/UPDATE_REQUEST', updateMeetup),
  takeLatest('@meetup/ADD_REQUEST', addMeetup),
]);
