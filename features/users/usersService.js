import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const BASE_URL = Constants.expoConfig.extra.apiUrl;
const API_URL = `${BASE_URL}/api/users`;

// Register new user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register/`, userData);

  if (response.data) {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(response.data));
    } catch (e) {
      throw new Error('Failed to save user locally');
    }
  }

  return response.data;
};

// Logout user
const logout = async () => {
  await AsyncStorage.removeItem('user');
  await AsyncStorage.removeItem('refreshToken');
  await AsyncStorage.removeItem('accessToken');
};

// Login user
const login = async (userData) => {
  const { email, password } = userData;
  const response = await axios.post(`${API_URL}/login/`, { email, password });
  if (response.data) {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
      await AsyncStorage.setItem('accessToken', response.data.tokens.access);
      await AsyncStorage.setItem('refreshToken', response.data.tokens.refresh);
    } catch (e) {
      throw new Error('Failed to save user data locally');
    }
  }
  return response.data;
};

// Resend account confirmation email
const resendConfirmationEmail = async (email) => {
  const response = await axios.post(`${API_URL}/resend-confirm-email/`, {
    email,
  });

  return response.data;
};

const confirmEmail = async (token) => {
  const response = await axios.get(`${API_URL}/confirm-email/${token}/`);
  return response.data;
};

const refreshAccessToken = async (refreshToken) => {
  const response = await axios.post(`${API_URL}/login/refresh/`, {
    refresh: refreshToken,
  });

  return response.data;
};

const updateProfile = async (userId, token, profile) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };

  const response = await axios.put(`${API_URL}/${userId}/`, profile, config);

  return response.data;
};

const sendForgotPasswordEmail = async (email) => {
  const response = await axios.post(`${API_URL}/request-reset-email/`, {
    email,
  });
  return response.data;
};

const resetPassword = async (token, uidb64, password) => {
  const response = await axios.patch(`${API_URL}/reset-password/`, {
    token,
    uidb64,
    password,
  });
  return response.data;
};

const getAuthUser = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/${userId}/`, config);

  return response.data;
};

const getUserById = async (userId) => {
  const response = await axios.get(`${API_URL}/${userId}/`);

  return response.data;
};

const usersService = {
  register,
  logout,
  login,
  resendConfirmationEmail,
  confirmEmail,
  refreshAccessToken,
  updateProfile,
  sendForgotPasswordEmail,
  resetPassword,
  getAuthUser,
  getUserById,
};

export default usersService;
