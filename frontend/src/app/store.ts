import { configureStore } from '@reduxjs/toolkit';

import { artistsReducer } from '../containers/artists/artistsSlice.ts';
import { albumReducer } from '../containers/album/albumSlice.ts';

export const store = configureStore({
  reducer: {
    artists: artistsReducer,
    albums: albumReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
