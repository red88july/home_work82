import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { Albums } from '../../types';

export const getAlbums = createAsyncThunk<Albums [], string>(
  'albums/fetch',
  async (id: string) => {
    const response = await axiosApi.get<Albums []>('/albums?artist=' + id);
    return response.data;
  }
);