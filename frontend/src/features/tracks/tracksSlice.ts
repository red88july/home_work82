import { createSlice } from '@reduxjs/toolkit';
import { getTracks } from './tracksThunk.ts';

import { RootState } from '../../app/store.ts';
import { Tracks } from '../../types';

interface TracksState {
  tracks: Tracks[];
  isLoadingTracks: boolean;
}

const initialState: TracksState ={
  tracks: [],
  isLoadingTracks: false,
};

export const tracksSlice =createSlice({
  name: 'tracks',
  initialState,
  reducers:{},

  extraReducers: (builder) => {
    builder.addCase(getTracks.pending, (state) => {
      state.isLoadingTracks = true;
    });
    builder.addCase(getTracks.fulfilled, (state, {payload: tracks}) => {
      state.isLoadingTracks = false;
      state.tracks = tracks;
    });
    builder.addCase(getTracks.rejected, (state) => {
      state.isLoadingTracks = false;
    });
  }
});

export const tracksReducer = tracksSlice.reducer;

export const selectTracks = (state:RootState) => state.tracks.tracks;
export const loadingTracks = (state:RootState) => state.tracks.isLoadingTracks;