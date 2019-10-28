import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/AUTH_SUCCESS': {
        draft.profile = action.payload.user;
        break;
      }
      case '@auth/SIGNOUT': {
        draft.profile = null;
        break;
      }
      case '@user/UPDATE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@user/UPDATE_SUCCESS': {
        draft.profile = action.payload.user;
        draft.loading = false;
        break;
      }
      case '@user/UPDATE_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
