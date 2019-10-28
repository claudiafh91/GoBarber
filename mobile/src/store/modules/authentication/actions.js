export function authenticationRequest(email, password) {
  return {
    type: '@auth/AUTH_REQUEST',
    payload: { email, password },
  };
}

export function authenticationSuccess(token, user) {
  return {
    type: '@auth/AUTH_SUCCESS',
    payload: { token, user },
  };
}

export function signFail() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signUpRequests(name, email, password) {
  return {
    type: '@auth/SIGNUP_REQUEST',
    payload: { name, email, password },
  };
}

export function signUpSuccess() {
  return {
    type: '@auth/SIGNUP_SUCCESS',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGNOUT',
  };
}
