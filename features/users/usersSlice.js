import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import usersService from './usersService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  user: null,
  initDone: false,
  tokenRefreshing: false,
  accessToken: null,
  refreshToken: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  errors: {},
};

export const initializeAuth = createAsyncThunk('users/initializeAuth', async () => {
  const user = JSON.parse(await AsyncStorage.getItem('user'));
  const refreshToken = await AsyncStorage.getItem('refreshToken');
  const accessToken = await AsyncStorage.getItem('accessToken');
  return { user, refreshToken, accessToken };
});

export const register = createAsyncThunk('users/register', async (user, thunkAPI) => {
  try {
    return await usersService.register(user);
  } catch (error) {
    let message = error.message || error.toString();

    if (
      error.response &&
      error.response.data &&
      typeof error.response.data === 'object'
    ) {
      message = error.response.data;
    }

    return thunkAPI.rejectWithValue(message);
  }
});

export const login = createAsyncThunk('users/login', async (user, thunkAPI) => {
  try {
    return await usersService.login(user);
  } catch (error) {
    let message = 'Invalid email or password';
    if (error.response && error.response.data && error.response.data.error) {
      message = error.response.data.error;
    }

    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk('users/logout', async () => {
  await usersService.logout();
});

export const resendConfirmationEmail = createAsyncThunk(
  'auth/resendEmail',
  async (email, thunkAPI) => {
    try {
      return await usersService.resendConfirmationEmail(email);
    } catch (error) {
      let message = error.message || error.toString();
      if (error.response && error.response.data && error.response.data.error) {
        message = error.response.data.error;
      }

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const confirmEmail = createAsyncThunk(
  'users/confirmEmail',
  async (token, thunkAPI) => {
    try {
      return await usersService.confirmEmail(token);
    } catch (error) {
      let message = error.message || error.toString();
      if (error.response && error.response.data && error.response.data.error) {
        message = error.response.data.error;
      }

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'users/updateProfile',
  async (profile, thunkAPI) => {
    try {
      const token = thunkAPI.getState().users.accessToken;
      const userId = thunkAPI.getState().users.user.id;
      return await usersService.updateProfile(userId, token, profile);
    } catch (error) {
      let message = error.message || error.toString();
      if (error.response && error.response.data && error.response.data.error) {
        message = error.response.data.error;
      }

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const sendForgotPasswordEmail = createAsyncThunk(
  'users/forgotPassMail',
  async (email, thunkAPI) => {
    try {
      return await usersService.sendForgotPasswordEmail(email);
    } catch (error) {
      let message = error.message || error.toString();
      if (error.response && error.response.data && error.response.data.error) {
        message = error.response.data.error;
      }

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'users/resetPassword',
  async ({ token, uidb64, password }, thunkAPI) => {
    try {
      return await usersService.resetPassword(token, uidb64, password);
    } catch (error) {
      let message = error.message || error.toString();

      if (
        error.response &&
        error.response.data &&
        typeof error.response.data === 'object'
      ) {
        message = error.response.data;
      }

      if (error.response && error.response.data && error.response.data.error) {
        message = error.response.data.error;
      }

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const refreshAuthUser = createAsyncThunk(
  'users/refreshAuthUser',
  async (_, thunkAPI) => {
    try {
      const userId = thunkAPI.getState().users.user.id;
      const token = thunkAPI.getState().users.accessToken;

      const user = await usersService.getAuthUser(userId, token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      return user;
    } catch (error) {
      let message = error.message || error.toString();

      if (
        error.response &&
        error.response.data &&
        typeof error.response.data === 'object'
      ) {
        message = error.response.data;
      }

      if (error.response && error.response.data && error.response.data.error) {
        message = error.response.data.error;
      }

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const refreshAccessToken = createAsyncThunk(
  'users/refreshAccessToken',
  async (_, thunkAPI) => {
    try {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      return await usersService.refreshAccessToken(refreshToken);
    } catch (error) {
      let message = error.message || error.toString();
      if (error.response && error.response.data && error.response.data.error) {
        message = error.response.data.error;
      }

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const clearErrors = () => ({
  type: 'users/clearErrors',
});

export const clearGeneralErrorMessage = () => ({
  type: 'users/clearGeneralErrorMessage',
});

// Takes in prop key and index of the error in the prop's error array
export const clearSpecificErrorMessage = (field, indexToRemove) => ({
  type: 'users/clearSpecificErrorMessage',
  payload: { field, indexToRemove },
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
      state.errors = {};
    },
    // Reducer to clear all errors
    clearErrors: (state) => {
      state.errors = {};
      state.isError = false;
      state.message = '';
    },
    // Reducer to clear the general error message
    clearGeneralErrorMessage: (state) => {
      state.message = '';
    },
    // Reducer to clear specific error messages
    clearSpecificErrorMessage: (state, action) => {
      const { field, indexToRemove } = action.payload;
      if (state.errors[field]) {
        state.errors[field].splice(indexToRemove, 1);
        // Remove the key if the error array is empty
        if (state.errors[field].length === 0) {
          delete state.errors[field];
        }
        // If there are no more errors left, update the isError state
        if (Object.keys(state.errors).length === 0) {
          state.isError = false;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.initDone = true;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        if (action.payload && typeof action.payload === 'object') {
          state.errors = action.payload;
        } else {
          // If it's just a string message, put it in the message field
          state.message = action.payload;
        }
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.tokens.access;
        state.refreshToken = action.payload.tokens.access.refresh;
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.user = null;
        state.message = action.payload;
      })
      .addCase(logout.rejected, (state) => {
        state.isError = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
      })
      .addCase(resendConfirmationEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resendConfirmationEmail.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(resendConfirmationEmail.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(confirmEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(confirmEmail.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(confirmEmail.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(sendForgotPasswordEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendForgotPasswordEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.success;
      })
      .addCase(sendForgotPasswordEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        if (action.payload && typeof action.payload === 'object') {
          state.errors = action.payload;
        } else {
          state.message = action.payload;
        }
      })
      .addCase(refreshAuthUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshAuthUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(refreshAuthUser.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(refreshAccessToken.pending, (state) => {
        state.tokenRefreshing = true;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.tokenRefreshing = false;
        state.accessToken = action.payload.access;
        AsyncStorage.setItem('accessToken', action.payload.access);
      })
      .addCase(refreshAccessToken.rejected, (state) => {
        state.tokenRefreshing = false;
        state.accessToken = null;
        state.refreshToken = null;
        state.user = null;
        AsyncStorage.removeItem('refreshToken');
        AsyncStorage.removeItem('accessToken');
        AsyncStorage.removeItem('user');
      });
  },
});

export default usersSlice.reducer;

export const { reset } = usersSlice.actions;
