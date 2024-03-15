import axios from 'axios';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
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
