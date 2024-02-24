import { createSlice } from '@reduxjs/toolkit';

import { registration } from './usersThunk.ts';
import { RootState } from '../../app/store.ts';
import { User, ValidationError} from '../../types';

interface UsersState {
  users: User | null;
  registrationLoading: boolean;
  registrationError: ValidationError | null;
}

const initialState: UsersState = {
  users: null,
  registrationLoading: false,
  registrationError: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(registration.pending, (state) => {
      state.registrationLoading = true;
      state.registrationError = null;
    });
    builder.addCase(registration.fulfilled, (state, {payload: data}) => {
      state.registrationLoading = false;
      state.users = data.user;
    });
    builder.addCase(registration.rejected, (state, {payload: error}) => {
      state.registrationLoading = false;
      state.registrationError = error || null;
    });
  }
});

export const usersReducer = usersSlice.reducer;

export const selectUser = (state: RootState) => state.users.users;
export const loadingRegistration = (state: RootState) => state.users.registrationLoading;
export const errorRegistration = (state: RootState) => state.users.registrationError;