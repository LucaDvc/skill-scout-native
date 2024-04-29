import axios from 'axios';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const API_URL = `${BASE_URL}/api/learning`;

const getQuizStep = async (quizStepId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/quiz-steps/${quizStepId}/`, config);

  return response.data;
};

const submitQuiz = async (quizStepId, choiceIds, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${API_URL}/quiz-steps/${quizStepId}/submit/`,
    {
      quiz_choices: choiceIds,
    },
    config
  );

  return response.data;
};

export const quizService = {
  submitQuiz,
  getQuizStep,
};
