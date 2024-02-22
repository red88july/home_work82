import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { Tracks } from '../../types';

export const getTracks = createAsyncThunk<Tracks [], string>(
  'tracks/fetch',
  async (id: string) => {
    const response = await axiosApi.get<Tracks []>('/tracks?album=' + id);
    return response.data;
  }
);