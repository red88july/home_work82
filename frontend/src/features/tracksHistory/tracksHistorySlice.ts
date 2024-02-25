import { createSlice } from '@reduxjs/toolkit';
import { GlobalError, User } from '../../types';
import { historyTrack } from './tracksHistoryThunk.ts';

interface TracksHistoryState {
  tracks: User | null;
  trackHistoryLoad: boolean;
  trackHistoryError: GlobalError | null;
}

const initialState: TracksHistoryState = {
  tracks: null,
  trackHistoryLoad: false,
  trackHistoryError: null,
};

export const tracksHistorySlice = createSlice({
  name: 'tracksHistory',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(historyTrack.pending, (state) => {
      state.trackHistoryLoad = true;
      state.trackHistoryError = null;
    });
    builder.addCase(historyTrack.fulfilled, (state, {payload: data}) => {
      state.trackHistoryLoad = false;
      state.tracks = data.user;
    });
    builder.addCase(historyTrack.rejected, (state, {payload: error}) => {
      state.trackHistoryLoad = false;
      state.trackHistoryError = error || null;
    });

  }
});

export const tracksHistoryReducer = tracksHistorySlice.reducer;

