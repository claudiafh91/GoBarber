import { all } from 'redux-saga/effects';

import Auth from './authentication/saga';
import User from './users/saga';
import Meetups from './meetups/saga';

export default function* rootSaga() {
  return yield all([Auth, User, Meetups]);
}
