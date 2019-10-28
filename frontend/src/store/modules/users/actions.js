export function updateProfileRequest(data) {
  return {
    type: '@user/UPDATE_REQUEST',
    payload: { data },
  };
}

export function updateProfileSuccess(user) {
  return {
    type: '@user/UPDATE_SUCCESS',
    payload: { user },
  };
}

export function updateProfileFail() {
  return {
    type: '@user/UPDATE_FAILURE',
  };
}
