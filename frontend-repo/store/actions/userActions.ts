/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from '../store';
import { FETCH_USER_FAILURE, FETCH_USER_REQUEST, FETCH_USER_SUCCESS, GET_USER_SUCCESS } from '../constant';
import api from '../../apis/api';
import { UserTypes } from '../../entities/userInterface';

export const fetchUsersRequest = () => ({
 type: FETCH_USER_REQUEST,
});

export const fetchUsersFailure = (error: string) => ({
 type: FETCH_USER_FAILURE,
 payload: error,
});

export const fetchAllUsers = () => {
 return async (dispatch: AppDispatch) => {
  dispatch(fetchUsersRequest());
  const authToken = localStorage.getItem('authToken');

  try {
   const response = await api.get('/users', {
    headers: {
     'Authorization': `Bearer ${authToken}`,
     'Content-Type': 'application/json',
    },
   });

   const users = response.data;

   dispatch({
    type: FETCH_USER_SUCCESS,
    payload: users,
   });

  } catch (error: any) {
   dispatch(fetchUsersFailure(error.message || 'Failed to fetch users'));
  }
 };
};

// Get one user by ID
export const fetchUserById = (id: string) => {
 return async (dispatch: AppDispatch) => {
  dispatch(fetchUsersRequest());
  const authToken = localStorage.getItem('authToken');

  try {
   const response = await api.get(`/users/${id}`, {
    headers: {
     'Authorization': `Bearer ${authToken}`,
     'Content-Type': 'application/json',
    },
   });

   const user = response.data;
   dispatch({
    type: GET_USER_SUCCESS,
    payload: user,
   });

  } catch (error: any) {
   dispatch(fetchUsersFailure(error.message || 'Failed to fetch user'));
  }
 };
};

export const createUser = (userData: {
 name: string,
 numberOfRents: string;
 totalAverageWeightRatings: string;
 recentlyActive: Date,
}) => {
 return async (dispatch: AppDispatch) => {
  dispatch(fetchUsersRequest());
  const authToken = localStorage.getItem('authToken');

  const userToCreate = {
   ...userData,
   recentlyActive: `${userData.recentlyActive}`,
  };

  try {
   const response = await api.post('/users', userToCreate, {
    headers: {
     'Authorization': `Bearer ${authToken}`,
     'Content-Type': 'application/json',
    },
   });

   const newUser = response.data;
   console.log('newUser ', newUser);
   dispatch(fetchAllUsers());
  } catch (error: any) {
   dispatch(fetchUsersFailure(error.message || 'Failed to create user'));
  }
 };
};

// Update user by ID
export const updateUser = (id: string, updatedData: UserTypes) => {
 return async (dispatch: AppDispatch) => {
  dispatch(fetchUsersRequest());
  const authToken = localStorage.getItem('authToken');

  try {
   const response = await api.put(`/users/${id}`, updatedData, {
    headers: {
     'Authorization': `Bearer ${authToken}`,
     'Content-Type': 'application/json',
    },
   });

   const updatedUser = response.data;
   console.log('updatedUser', updatedUser);
   dispatch(fetchAllUsers());
  } catch (error: any) {
   dispatch(fetchUsersFailure(error.message || 'Failed to update user'));
  }
 };
};

// Delete user by ID
export const deleteUser = (id: string) => {
 return async (dispatch: AppDispatch) => {
  dispatch(fetchUsersRequest());
  const authToken = localStorage.getItem('authToken');

  try {
   const response = await api.delete(`/users/${id}`, {
    headers: {
     'Authorization': `Bearer ${authToken}`,
     'Content-Type': 'application/json',
    },
   });

   console.log('response', response);

   // You can dispatch a specific action here if you need to remove the user from the store.
   dispatch(fetchAllUsers());
  } catch (error: any) {
   dispatch(fetchUsersFailure(error.message || 'Failed to delete user'));
  }
 };
};
