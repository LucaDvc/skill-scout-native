import { configureStore } from '@reduxjs/toolkit';
import catalogReducer from './catalog/catalogSlice';
import usersReducer from './users/usersSlice';

export const store = configureStore({
  reducer: {
    catalog: catalogReducer,
    users: usersReducer,
  },
});
