import { configureStore } from '@reduxjs/toolkit';

import menuReducer from './slices/menuSlice';
import keyReducer from './slices/keySlice';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    key: keyReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
