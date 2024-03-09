import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { Tracks, TracksData, TracksMutation, UpdateAlbum, ValidationError } from '../../types';
import { RootState } from '../../app/store.ts';
import { isAxiosError } from 'axios';

export const trackCreate = createAsyncThunk<TracksMutation, TracksData, { rejectValue: ValidationError, state: RootState }>(
  'tracks/trackCreate',
  async (track, {rejectWithValue, getState}) => {

    try {
      const token = getState().users.usersLog?.user.token;

      const response = await axiosApi.post('/tracks', track, {headers: {'Authorization': 'Bearer ' + token}});
      return response.data;

    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  }
);

export const getTracks = createAsyncThunk<Tracks [], string>(
  'tracks/fetch',
  async (id: string) => {
    const response = await axiosApi.get<Tracks []>('/tracks?album=' + id);
    return response.data;
  }
);

export const deleteTrack = createAsyncThunk<void, string, { state: RootState }>(
  'track/deleteTrack',
  async (id, {getState}) => {
    const token = getState().users.usersLog?.user.token;
    const response = await axiosApi.delete('/tracks/' + id, {headers: {'Authorization': 'Bearer ' + token}});
    return response.data;
  }
);

export const updateTrack = createAsyncThunk<UpdateAlbum, string, { state: RootState }>(
  'albums/updateTrack',
  async (id, {getState}) => {
    const token = getState().users.usersLog?.user.token;
    const response = await axiosApi.patch(`/tracks/` + id + '/togglePublished', null, {headers: {'Authorization': 'Bearer ' + token}});
    return response.data;
  }
);