import axios from 'axios';
import Constants from 'expo-constants';

const BASE_URL = Constants.expoConfig.extra.apiUrl;
const API_URL = `${BASE_URL}/api/catalog`;

// Get category list
const getCategories = async () => {
  const response = await axios.get(`${API_URL}/categories/`);
  return response.data;
};

const categoryService = {
  getCategories,
};

export default categoryService;
