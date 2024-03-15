import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import teachingService from './teachingService';

const initialState = {
  courses: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getActiveCourses = createAsyncThunk(
  'teaching/getActiveCourses',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().users.accessToken;
      return await teachingService.getActiveCourses(token);
    } catch (error) {
      let message = error.detail || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const teachingSlice = createSlice({
  name: 'teaching',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
      state.courses = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getActiveCourses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getActiveCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.courses = action.payload;
      })
      .addCase(getActiveCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default teachingSlice.reducer;

export const { reset } = teachingSlice.actions;
