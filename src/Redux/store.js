import { configureStore } from '@reduxjs/toolkit';
import displayBodyReducer from './slices/dispBody';

export const store = configureStore({
  reducer: {
    displayMainBody: displayBodyReducer,
  },
});