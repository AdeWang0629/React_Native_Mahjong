import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import messageReducer from './message';
import usersReducer from './users';
import globalReducer from './global';
import { playerEditApi } from '../api/playerEditApi';
import { gameEditApi } from '../api/gameEditApi';

export const store = configureStore({
  reducer: {
    message: messageReducer,
    users: usersReducer,
    global: globalReducer,
    [playerEditApi.reducerPath] : playerEditApi.reducer,
    [gameEditApi.reducerPath] : gameEditApi.reducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(playerEditApi.middleware)
      .concat(gameEditApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);