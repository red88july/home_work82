import { createSlice } from '@reduxjs/toolkit';

import {artistCreate, getArtists} from './artistsThunk.ts';
import {RootState} from '../../app/store.ts';

import {Artists, ArtistsMutation, ValidationError} from '../../types';

interface ArtistsState {
  artist: ArtistsMutation | null;

  isLoadingArtist: boolean;
  isErrorArtist: ValidationError | null;

  artists: Artists[];
  isLoadingArtists: boolean;
}

const initialState: ArtistsState ={
  artist: null,
  isLoadingArtist: false,
  isErrorArtist: null,
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

    builder.addCase(artistCreate.pending, (state) => {
      state.isLoadingArtist = true;
      state.isErrorArtist = null;
    });
    builder.addCase(artistCreate.fulfilled, (state, {payload: data}) => {
      state.isLoadingArtist = false;
      state.artist = data;
    });
    builder.addCase(artistCreate.rejected, (state, {payload: error}) => {
      state.isLoadingArtist = false;
      state.isErrorArtist = error || null;
    });
  }
});

export const artistsReducer = artistsSlice.reducer;

export const selectArtists = (state:RootState) => state.artists.artists;
export const selectDetailsArtists = (state:RootState) => state.artists.artist;
export const loadingArtists = (state:RootState) => state.artists.isLoadingArtists;

export const isLoadingArtists = (state:RootState) => state.artists.isLoadingArtist;
export const isErrorLoadArtists = (state:RootState) => state.artists.isErrorArtist;