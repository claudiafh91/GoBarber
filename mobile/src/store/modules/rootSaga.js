import { all } from 'redux-saga/effects';

import Auth from './authentication/saga';
import User from './users/saga';

export default function* rootSaga() {
  return yield all([Auth, User]);
}
