import { configureStore } from '@reduxjs/toolkit';

import phraseReducer from './slices/phraseSlice';
import menuReducer from './slices/menuSlice';

export const store = configureStore({
  reducer: {
    phrase: phraseReducer,
    menu: menuReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
