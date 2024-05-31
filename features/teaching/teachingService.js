import axios from 'axios';
import Constants from 'expo-constants';

const BASE_URL = Constants.expoConfig.extra.apiUrl;
const API_URL = BASE_URL + '/api/teaching';

const getActiveCourses = async (token) => {
  const response = await axios.get(`${API_URL}/courses/?active=true`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const teachingService = {
  getActiveCourses,
};

export default teachingService;
