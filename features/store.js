import { configureStore } from '@reduxjs/toolkit';
import catalogReducer from './catalog/catalogSlice';
import usersReducer from './users/usersSlice';
import learningReducer from './learning/learningSlice';
import teachingReducer from './teaching/teachingSlice';

export const store = configureStore({
  reducer: {
    catalog: catalogReducer,
    users: usersReducer,
    learning: learningReducer,
    teaching: teachingReducer,
  },
});
