import produce from 'immer';

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/AUTH_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/AUTH_SUCCESS': {
        draft.token = action.payload.token;
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@auth/SIGNUP_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGNUP_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@auth/SIGNOUT': {
        draft.token = null;
        draft.signed = false;
        break;
      }
      default:
    }
  });
}
