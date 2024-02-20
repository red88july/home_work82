import { Artists } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { getArtists } from './artistsThunk.ts';
import {RootState} from '../../app/store.ts';

interface ArtistsState {
  items: Artists[];
  isLoadingArtists: boolean;
}

const initialState: ArtistsState ={
  items: [],
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
      state.items = artists;
    });
    builder.addCase(getArtists.rejected, (state) => {
      state.isLoadingArtists = false;
    });
  }
});

export const artistsReducer = artistsSlice.reducer;

export const selectArtists = (state:RootState) => state.artists.items;