import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { Artists } from '../../types';

export const getArtists = createAsyncThunk(
  'artists/fetch',
  async () => {
    const response = await axiosApi.get<Artists []>('/artists');
    return response.data;
  }
);