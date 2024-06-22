import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import catalogService from './catalogService';

const initialState = {
  popularCourses: {
    courses: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  },
  highestRatedCourses: {
    courses: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  },
  tags: {
    list: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  },
  enroll: {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  },
  wishlist: {
    courses: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  },
  courses: [],
  resultsCount: 0,
  hasMore: true,
  course: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  isWishlistUpdating: false,
  message: '',
  filters: {},
};

export const getHighestRatedCourses = createAsyncThunk(
  'catalog/getHighestRatedCourses',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().users.accessToken;
      return await catalogService.getHighestRatedCourses(token);
    } catch (error) {
      console.error(error);
      let message = error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getPopularCourses = createAsyncThunk(
  'catalog/getPopularCourses',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().users.accessToken;
      return await catalogService.getPopularCourses(token);
    } catch (error) {
      console.error(error);
      let message = error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getCoursesByFilter = createAsyncThunk(
  'catalog/getByFilter',
  async (params, thunkAPI) => {
    try {
      const token = thunkAPI.getState().users.accessToken;
      return await catalogService.getCoursesByFilter(params, token);
    } catch (error) {
      console.error(error);
      let message = error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getTags = createAsyncThunk('catalog/getTags', async (_, thunkAPI) => {
  try {
    return await catalogService.getTags();
  } catch (error) {
    console.error(error);
    let message = error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const getCourseById = createAsyncThunk(
  'catalog/getCourseById',
  async (id, thunkAPI) => {
    try {
      return await catalogService.getCourseById(id);
    } catch (error) {
      console.error(error);
      let message;
      if (error.response.status === 404) {
        message = 'Not found';
      } else {
        message = error.message || error.toString();
      }

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const wishlistCourse = createAsyncThunk(
  'catalog/wishlistCourse',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().users.accessToken;
      return await catalogService.wishlistCourse(id, token);
    } catch (error) {
      console.error(error);
      let message;
      if (error.response.status === 404) {
        message = 'Not found';
      } else {
        message = error.message || error.toString();
      }

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const courseEnroll = createAsyncThunk(
  'catalog/courseEnroll',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().users.accessToken;
      return await catalogService.courseEnroll(id, token);
    } catch (error) {
      console.error(error);
      let message;
      if (error.response.status === 404) {
        message = 'Not found';
      } else {
        message = error.response.data.error || error.toString();
      }

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getWishlist = createAsyncThunk(
  'catalog/getWishlist',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().users.accessToken;
      return await catalogService.getWishlist(token);
    } catch (error) {
      console.error(error);
      let message = error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
      state.courses = [];
      state.course = {};
      state.resultsCount = 0;
      state.hasMore = true;
    },
    statusesReset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
    changeFilters: (state, action) => {
      state.filters = action.payload;
    },
    resetFilters: (state) => {
      state.filters = {};
    },
    resetEnroll: (state) => {
      state.enroll = {
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHighestRatedCourses.pending, (state) => {
        state.highestRatedCourses.isLoading = true;
        state.highestRatedCourses.isError = false;
        state.highestRatedCourses.isSuccess = false;
        state.highestRatedCourses.message = '';
      })
      .addCase(getHighestRatedCourses.fulfilled, (state, action) => {
        state.highestRatedCourses.isSuccess = true;
        state.highestRatedCourses.isLoading = false;
        state.highestRatedCourses.courses = action.payload.results.slice(0, 5);
      })
      .addCase(getHighestRatedCourses.rejected, (state, action) => {
        state.highestRatedCourses.isError = true;
        state.highestRatedCourses.isLoading = false;
        state.highestRatedCourses.message = action.payload;
      })
      .addCase(getPopularCourses.pending, (state) => {
        state.popularCourses.isLoading = true;
        state.popularCourses.isSuccess = false;
        state.popularCourses.isError = false;
        state.popularCourses.message = '';
      })
      .addCase(getPopularCourses.fulfilled, (state, action) => {
        state.popularCourses.courses = action.payload.results.slice(0, 7);
        state.popularCourses.isSuccess = true;
        state.popularCourses.isLoading = false;
      })
      .addCase(getPopularCourses.rejected, (state, action) => {
        state.popularCourses.isError = true;
        state.popularCourses.isLoading = false;
        state.popularCourses.message = action.payload;
      })
      .addCase(getCoursesByFilter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCoursesByFilter.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.courses = [...state.courses, ...action.payload.results];
        state.resultsCount = action.payload.count;
        state.hasMore = action.payload.next != null;
      })
      .addCase(getCoursesByFilter.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(getTags.pending, (state) => {
        state.tags.isLoading = true;
      })
      .addCase(getTags.fulfilled, (state, action) => {
        state.tags.isSuccess = true;
        state.tags.isLoading = false;
        state.tags.list = action.payload;
      })
      .addCase(getTags.rejected, (state, action) => {
        state.tags.isError = true;
        state.tags.isLoading = false;
        state.tags.message = action.payload;
      })
      .addCase(getCourseById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCourseById.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.course = action.payload;
      })
      .addCase(getCourseById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(wishlistCourse.pending, (state) => {
        state.isWishlistUpdating = true;
      })
      .addCase(wishlistCourse.fulfilled, (state) => {
        state.isWishlistUpdating = false;
      })
      .addCase(wishlistCourse.rejected, (state) => {
        state.isWishlistUpdating = false;
      })
      .addCase(courseEnroll.pending, (state) => {
        state.enroll.isLoading = true;
        state.enroll.isError = false;
        state.enroll.isSuccess = false;
        state.enroll.message = '';
      })
      .addCase(courseEnroll.fulfilled, (state) => {
        state.enroll.isLoading = false;
        state.enroll.isSuccess = true;
      })
      .addCase(courseEnroll.rejected, (state) => {
        state.enroll.isLoading = false;
        state.enroll.isError = true;
      })
      .addCase(getWishlist.pending, (state) => {
        state.wishlist.isLoading = true;
        state.wishlist.isError = false;
        state.wishlist.isSuccess = false;
        state.wishlist.message = '';
        state.wishlist.courses = [];
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.wishlist.courses = action.payload;
        state.wishlist.isLoading = false;
        state.wishlist.isSuccess = true;
      })
      .addCase(getWishlist.rejected, (state) => {
        state.wishlist.isLoading = false;
        state.wishlist.isError = true;
      });
  },
});

export default catalogSlice.reducer;

export const {
  reset,
  statusesReset,
  changeFilters,
  resetFilters,
  resetHasMore,
  resetEnroll,
} = catalogSlice.actions;
