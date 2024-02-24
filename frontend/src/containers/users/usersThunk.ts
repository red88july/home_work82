import { createAsyncThunk } from '@reduxjs/toolkit';

import { isAxiosError } from 'axios';
import axiosApi from '../../axiosApi.ts';

import { RegistrationMutation, RegistrationResponse, ValidationError } from '../../types';

export const registration = createAsyncThunk<RegistrationResponse, RegistrationMutation, {  rejectValue: ValidationError}>(
  'users/registered',
  async (registrationMutation, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post('/users', registrationMutation);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);