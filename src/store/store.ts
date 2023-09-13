/** Core */
import { configureStore } from '@reduxjs/toolkit';

/** Reducers */
import { messagesReducer, userReducer } from '../reducers';

export const store = configureStore({
  reducer: {
    messages: messagesReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
