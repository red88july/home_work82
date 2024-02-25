import {combineReducers, configureStore} from '@reduxjs/toolkit';

import { artistsReducer } from '../containers/artists/artistsSlice.ts';
import { albumReducer } from '../containers/albums/albumsSlice.ts';
import {tracksReducer} from '../containers/tracks/tracksSlice.ts';
import {usersReducer} from '../containers/users/usersSlice.ts';
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

const usersPersistConfig = {
  key: 'music:users',
  storage: storage,
  whitelist: ['users'],
};

const rootReducer = combineReducers({
  artists: artistsReducer,
  albums: albumReducer,
  tracks: tracksReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;