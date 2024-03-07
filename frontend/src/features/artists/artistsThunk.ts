import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import {Artists, ArtistsData, ArtistsMutation, ValidationError} from '../../types';
import {RootState} from '../../app/store.ts';
import {isAxiosError} from 'axios';

export const artistCreate = createAsyncThunk<ArtistsMutation, ArtistsData, { rejectValue: ValidationError, state: RootState }>(
  'artists/artistCreate',
  async (artist, {rejectWithValue, getState}) => {

    try {
      const token = getState().users.usersLog?.user.token;

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
