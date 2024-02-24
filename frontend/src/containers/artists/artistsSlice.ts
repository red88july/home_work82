import { createSlice } from '@reduxjs/toolkit';

import { getArtists } from './artistsThunk.ts';
import {RootState} from '../../app/store.ts';

import { Artists } from '../../types';

interface ArtistsState {
  artists: Artists[];
  isLoadingArtists: boolean;
}

const initialState: ArtistsState ={
  artists: [],
  isLoadingArtists: false,
};

export const artistsSlice =createSlice({
  name: 'artists',
  initialState,
  reducers:{},

  extraReducers: (builder) => {
    builder.addCase(getArtists.pending, (state) => {
      state.isLoadingArtists = true;
    });
    builder.addCase(getArtists.fulfilled, (state, {payload: artists}) => {
      state.isLoadingArtists = false;
      state.artists = artists;
    });
    builder.addCase(getArtists.rejected, (state) => {
      state.isLoadingArtists = false;
    });
  }
});

export const artistsReducer = artistsSlice.reducer;
export const selectArtists = (state:RootState) => state.artists.artists;
export const loadingArtists = (state:RootState) => state.artists.isLoadingArtists;