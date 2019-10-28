import produce from 'immer';

const INITIAL_STATE = {
  myMeetups: null,
};

export default function meetups(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@meetup/DETAILS_MEETUP': {
        draft.myMeetups = action.payload.meetup;
        break;
      }
      case '@meetup/CLEAN_STATE_MEETUP': {
        draft.myMeetups = null;
        break;
      }
      case '@meetup/UPDATE_SUCCESS': {
        draft.myMeetups = action.payload.meetup;
        break;
      }
      case '@auth/SIGNOUT': {
        draft.myMeetups = null;
        break;
      }
      default:
    }
  });
}
