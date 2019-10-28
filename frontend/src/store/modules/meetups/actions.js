export function addDetailsMeetups(meetup) {
  return {
    type: '@meetup/DETAILS_MEETUP',
    payload: { meetup },
  };
}

export function deleteMeetupsRequest(id) {
  return {
    type: '@meetup/DELETE_REQUEST',
    payload: { id },
  };
}

export function cleanStateMeetup() {
  return {
    type: '@meetup/CLEAN_STATE_MEETUP',
  };
}

export function updateMeetupsRequest(id, data) {
  return {
    type: '@meetup/UPDATE_REQUEST',
    payload: { id, data },
  };
}

export function updateMeetupsSuccess(meetup) {
  return {
    type: '@meetup/UPDATE_SUCCESS',
    payload: { meetup },
  };
}

export function addMeetupsRequest(meetup) {
  return {
    type: '@meetup/ADD_REQUEST',
    payload: { meetup },
  };
}
