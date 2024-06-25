import axios from 'axios';
import Constants from 'expo-constants';

const BASE_URL = Constants.expoConfig.extra.apiUrl;
const API_URL = `${BASE_URL}/api/learning`;

const getCourses = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/courses/`, config);

  return response.data;
};

const getCourseById = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/courses/${id}/`, config);
  return response.data;
};

const completeLessonStep = async (lessonStepId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${API_URL}/progress/steps/${lessonStepId}/`,
    {},
    config
  );

  return response.data;
};

const sendEngagementData = async (stepId, timeSpent, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${API_URL}/analytics/engagement/`,
    {
      step_id: stepId,
      time_spent: timeSpent,
    },
    config
  );
  console.log(response.data);
  return response.data;
};

const learningService = {
  getCourses,
  getCourseById,
  completeLessonStep,
  sendEngagementData,
};

export default learningService;
