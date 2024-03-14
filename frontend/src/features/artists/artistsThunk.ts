import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';

import axiosApi from '../../axiosApi.ts';
import { isAxiosError } from 'axios';

import { Artists, ArtistsData, ArtistsMutation, UpdateArtist, ValidationError } from '../../types';

export const artistCreate = createAsyncThunk<ArtistsMutation, ArtistsData, {
  rejectValue: ValidationError,
  state: RootState
}>(
  'artists/artistCreate',
  async (artist, {rejectWithValue, getState}) => {

    try {
      const token = getState().users.usersLog?.token;

      const formData = new FormData();
      const keys = Object.keys(artist) as (keyof ArtistsData)[];

      keys.forEach(key => {
        const value = artist[key];

        if (value !== null) {
          formData.append(key, value);
        }
      });

      const response = await axiosApi.post('/artists', formData, {headers: {'Authorization': 'Bearer ' + token}});
      return response.data;

    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  }
);

export const getArtists = createAsyncThunk<Artists []>(
  'artists/fetch',
  async () => {
    const response = await axiosApi.get<Artists []>('/artists');
    return response.data;
  }
);

export const getAllArtists = createAsyncThunk<Artists []>(
  'artists/fetchAll',
  async () => {
    const response = await axiosApi.get<Artists []>('/artists/get-artist');
    return response.data;
  }
);

export const deleteArtist = createAsyncThunk<Artists, string, { state: RootState }>(
  'artists/deleteArtist',
  async (id, {getState}) => {
    const token = getState().users.usersLog?.token;
    const response = await axiosApi.delete('/artists/' + id, {headers: {'Authorization': 'Bearer ' + token}});
    return response.data;
  }
);

export const updateArtist = createAsyncThunk<UpdateArtist, string, { state: RootState }>(
  'artists/updateArtist',
  async (id, {getState}) => {
     const token = getState().users.usersLog?.token;
      const response = await axiosApi.patch(`/artists/` + id + '/togglePublished', null, {headers: {'Authorization': 'Bearer ' + token}});
      return response.data;
  }
);