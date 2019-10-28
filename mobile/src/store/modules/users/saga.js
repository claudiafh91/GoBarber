import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { updateProfileSuccess, updateProfileFail } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;

    const profile = {
      name,
      email,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, 'user', profile);

    yield put(updateProfileSuccess(response.data));

    Alert.alert('Perfil atualizado com sucesso!');
  } catch (err) {
    Alert.alert('Falha na atualização, tente novamente!');
    yield put(updateProfileFail());
  }
}

export default all([takeLatest('@user/UPDATE_REQUEST', updateProfile)]);
