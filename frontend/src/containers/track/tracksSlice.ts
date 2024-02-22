import { createSlice } from '@reduxjs/toolkit';
import { getTracks } from './tracksThunk.ts';

import { RootState } from '../../app/store.ts';
import { Tracks } from '../../types';

interface TracksState {
  items: Tracks[];
  isLoadingTracks: boolean;
}

const initialState: TracksState ={
  items: [],
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
      state.items = tracks;
    });
    builder.addCase(getTracks.rejected, (state) => {
      state.isLoadingTracks = false;
    });
  }
});

export const tracksReducer = tracksSlice.reducer;

export const selectTracks = (state:RootState) => state.tracks.items;