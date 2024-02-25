import { createAsyncThunk } from '@reduxjs/toolkit';
import {GlobalError, TrackHistory } from '../../types';
import axiosApi from '../../axiosApi.ts';
import { isAxiosError } from 'axios';

export const historyTrack = createAsyncThunk<TrackHistory, { track: string, token: string}, { rejectValue: GlobalError }>(
  'tracksHistory/historyTrack',
  async ({ track, token }, {rejectWithValue} ) => {

    try {
      const response = await axiosApi.post('/track_history', { track }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  }
);
