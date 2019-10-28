import { combineReducers } from 'redux';

import Auth from './authentication/reducer';
import User from './users/reducer';
import Meetups from './meetups/reducer';

export default combineReducers({
  Auth,
  User,
  Meetups,
});
