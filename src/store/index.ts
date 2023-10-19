import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import globalReducer from './global';
import { playerEditApi } from '../api/playerEditApi';
import { gameEditApi } from '../api/gameEditApi';
import { scoreEditApi } from '../api/scoreEditApi';

export const store = configureStore({
  reducer: {
    global: globalReducer,
    [playerEditApi.reducerPath] : playerEditApi.reducer,
    [gameEditApi.reducerPath] : gameEditApi.reducer,
    [scoreEditApi.reducerPath] : scoreEditApi.reducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
      .concat(playerEditApi.middleware)
      .concat(gameEditApi.middleware)
      .concat(scoreEditApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);