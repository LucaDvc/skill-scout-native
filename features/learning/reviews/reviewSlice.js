import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import reviewService from './reviewService';

const initialState = {
  reviews: [],
  review: {},
  averageRating: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  post: {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  },
};

export const getReviews = createAsyncThunk(
  'learning/reviews/getReviews',
  async (courseId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().users.accessToken;
      return await reviewService.getReviews(token, courseId);
    } catch (error) {
      let message;
      if (error.response.status === 404) {
        message = 'Course not found';
      } else {
        message = error.message || error.toString();
      }

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const postReview = createAsyncThunk(
  'learning/reviews/postReview',
  async ({ courseId, review }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().users.accessToken;
      return await reviewService.postReveiw(token, courseId, review);
    } catch (error) {
      console.error(error);
      let message;
      if (error.response.status === 404) {
        message = 'Course not found';
      } else {
        message =
          error.response?.data?.error || error.message || error.toString();
      }

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateReview = createAsyncThunk(
  'learning/reviews/updateReview',
  async ({ reviewId, review }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().users.accessToken;
      return await reviewService.updateReview(token, reviewId, review);
    } catch (error) {
      let message;
      if (error.response.status === 404) {
        message = 'Review not found';
      } else {
        message = error.message || error.toString();
      }

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
      state.reviews = [];
      state.review = {};
    },
    statusesReset: (state) => {
      state.post.isLoading = false;
      state.post.isError = false;
      state.post.isSuccess = false;
      state.post.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const reviews = action.payload;
        state.reviews = reviews;
        state.averageRating =
          reviews.reduce((acc, review) => acc + review.rating, 0) /
          reviews.length;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(postReview.pending, (state) => {
        state.post.isLoading = true;
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.post.isLoading = false;
        state.post.isSuccess = true;
        state.post.review = action.payload;
        state.reviews.unshift(action.payload);
      })
      .addCase(postReview.rejected, (state, action) => {
        state.post.isLoading = false;
        state.post.isError = true;
        state.post.message = action.payload;
      })
      .addCase(updateReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.review = action.payload;
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default reviewSlice.reducer;

export const { reset, statusesReset } = reviewSlice.actions;
