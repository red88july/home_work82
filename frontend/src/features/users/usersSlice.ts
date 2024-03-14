import { createSlice } from '@reduxjs/toolkit';

import {googleLogin, login, registration} from './usersThunk.ts';
import { RootState } from '../../app/store.ts';
import {GlobalError, LoginResponse, RegistrationResponse, ValidationError} from '../../types';

interface UsersState {
  users: RegistrationResponse | null;
  usersLog: LoginResponse | null;
  usersGoogleLog: LoginResponse | null;

  registrationLoading: boolean;
  registrationError: ValidationError | null;

  loginLoading: boolean;
  loginError: GlobalError | null;

  loginUserGoogle: boolean;
  loginUserErrorGoogle: GlobalError | null;
}

const initialState: UsersState = {
  users: null,
  usersLog: null,
  usersGoogleLog: null,

  registrationLoading: false,
  registrationError: null,

  loginLoading: false,
  loginError:  null,

  loginUserGoogle: false,
  loginUserErrorGoogle: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.usersLog = null;
    }
  },

  extraReducers: (builder) => {
    builder.addCase(registration.pending, (state) => {
      state.registrationLoading = true;
      state.registrationError = null;
    });
    builder.addCase(registration.fulfilled, (state, {payload: data}) => {
      state.registrationLoading = false;
      state.users = data;
    });
    builder.addCase(registration.rejected, (state, {payload: error}) => {
      state.registrationLoading = false;
      state.registrationError = error || null;
    });

    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
      state.loginError = null;
    });
    builder.addCase(login.fulfilled, (state, {payload: data}) => {
      state.loginLoading = false;
      state.usersLog = data;
    });
    builder.addCase(login.rejected, (state, {payload: error}) => {
      state.loginLoading = true;
      state.loginError = error || null;
    });

    builder.addCase(googleLogin.pending, (state) => {
      state.loginUserGoogle = true;
      state.loginUserErrorGoogle = null;
    });
    builder.addCase(googleLogin.fulfilled, (state, {payload: data}) => {
      state.loginUserGoogle = false;
      state.usersGoogleLog = data;
    });
    builder.addCase(googleLogin.rejected, (state, {payload: error}) => {
      state.loginUserGoogle = true;
      state.loginUserErrorGoogle = error || null;
    });
  }
});

export const usersReducer = usersSlice.reducer;
export const {unsetUser} = usersSlice.actions;

export const selectUserLog = (state: RootState) => state.users.usersLog;

export const loadingRegistration = (state: RootState) => state.users.registrationLoading;
export const errorRegistration = (state: RootState) => state.users.registrationError;

export const selectLoginLoading = (state: RootState) => state.users.loginLoading;
export const selectLoginError = (state: RootState) => state.users.loginError;