import axios from 'axios';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
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
  console.log('calling completeLessonStep');

  const response = await axios.post(
    `${API_URL}/progress/steps/${lessonStepId}/`,
    {},
    config
  );

  return response.data;
};

const learningService = {
  getCourses,
  getCourseById,
  completeLessonStep,
};

export default learningService;
