import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from '../constant';

export const loginRequest = () => ({
 type: LOGIN_REQUEST,
});

export const loginSuccess = (token: string) => {
 if (typeof window !== 'undefined') {
  localStorage.setItem('authToken', token);
 }
 return {
  type: LOGIN_SUCCESS,
  payload: token,
 };
};

export const loginFail = (error: string) => ({
 type: LOGIN_FAILURE,
 payload: error,
});

