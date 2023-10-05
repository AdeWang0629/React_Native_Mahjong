import { configureStore } from '@reduxjs/toolkit';
import messageReducer from './message';
import usersReducer from './users';
import globalReducer from './global';

export const store = configureStore({
  reducer: {
    message: messageReducer,
    users: usersReducer,
    global: globalReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
