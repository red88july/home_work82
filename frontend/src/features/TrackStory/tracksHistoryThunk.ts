import { createAsyncThunk } from '@reduxjs/toolkit';

import { GlobalError, TrackDataHistory, TrackHistory } from '../../types';
import axiosApi from '../../axiosApi.ts';
import { isAxiosError } from 'axios';

export const historyPostTrack = createAsyncThunk<TrackHistory, { track: string, token: string },
  { rejectValue: GlobalError }>(
  'tracksHistory/historyTrack',
  async ({track, token}, {rejectWithValue}) => {

    try {
      const response = await axiosApi.post('/track_history', {track, token}, {
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

export const historyGetTrack = createAsyncThunk<TrackDataHistory [], { token: string }>(
  'historyGetTrack/historyGetTrack',
  async ({token}) => {

    const response = await axiosApi.get<TrackDataHistory []>('/track_history', {
      headers: {Authorization: `Bearer ${token}`},
    });
    return response.data;

  });