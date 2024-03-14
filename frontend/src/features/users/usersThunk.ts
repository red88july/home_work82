import {createAsyncThunk} from '@reduxjs/toolkit';

import {isAxiosError} from 'axios';
import axiosApi from '../../axiosApi.ts';

import {
  GlobalError,
  LoginMutation,
  LoginResponse,
  RegistrationMutation,
  RegistrationResponse,
  ValidationError
} from '../../types';
import {RootState} from '../../app/store.ts';
import {unsetUser} from './usersSlice.ts';

export const registration = createAsyncThunk<RegistrationResponse, RegistrationMutation, {
  rejectValue: ValidationError
}>(
  'users/registered',
  async (registration, {rejectWithValue}) => {
    try {
      const formData = new FormData();
      const keys = Object.keys(registration) as (keyof RegistrationMutation)[];

      keys.forEach(key => {
        const value = registration[key];

        if (value !== null) {
          formData.append(key, value);
        }
      });

      const response = await axiosApi.post('/users', formData);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);

export const login = createAsyncThunk<LoginResponse, LoginMutation, { rejectValue: GlobalError }>(
  'users/login',
  async (loginMutation, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post('/users/sessions', loginMutation);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  }
);

export const logout = createAsyncThunk<void, undefined, { state: RootState }>(
  'users/logout',
  async (_, {getState, dispatch}) => {
    const token = getState().users.usersLog?.token;
    await axiosApi.delete('/users/sessions', {headers: {'Authorization': `Bearer:${token}`}});
    dispatch(unsetUser());
  }
);

export const googleLogin = createAsyncThunk<LoginResponse, string,  { rejectValue: GlobalError }>(
  'users/googleLogin',
  async (credential , {rejectWithValue}) => {
    try {
      const response = await axiosApi.post('users/google', {credential});
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  }
);