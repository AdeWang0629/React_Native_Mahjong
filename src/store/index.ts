import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import messageReducer from './message';
import usersReducer from './users';
import globalReducer from './global';
import { jsonServerApi } from '../api/jsonServerApi';

export const store = configureStore({
  reducer: {
    message: messageReducer,
    users: usersReducer,
    global: globalReducer,
    [jsonServerApi.reducerPath]: jsonServerApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(jsonServerApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);