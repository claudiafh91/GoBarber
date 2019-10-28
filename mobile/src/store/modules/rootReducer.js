import { combineReducers } from 'redux';

import Auth from './authentication/reducer';
import User from './users/reducer';

export default combineReducers({
  Auth,
  User,
});
