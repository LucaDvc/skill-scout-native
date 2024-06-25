import axios from 'axios';
import Constants from 'expo-constants';

const BASE_URL = Constants.expoConfig.extra.apiUrl;
const API_URL = `${BASE_URL}/api/learning`;

const getSortingProblem = async (stepId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/sorting-steps/${stepId}/`, config);

  return response.data;
};

const submitSortingProblem = async (stepId, request, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${API_URL}/sorting-steps/${stepId}/`,
    request,
    config
  );

  return response.data;
};

export const sortingProblemService = {
  submitSortingProblem,
  getSortingProblem,
};
