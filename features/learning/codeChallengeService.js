import axios from 'axios';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const API_URL = `${BASE_URL}/api/learning`;

const submitCodeChallenge = async (codeChallengeId, code, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    `${API_URL}/code-challenge-steps/${codeChallengeId}/submit/`,
    {
      code,
      acting_role: 'learner',
    },
    config
  );
  return response.data;
};

let timerId = null;

const getSubmissionResult = async (
  taskToken,
  accessToken,
  maxRetries = 10,
  retryDelay = 750
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const fetchResult = async () => {
    if (maxRetries === 0) {
      clearTimeout(timerId.current);
      throw new Error('Max retries exceeded');
    }
    maxRetries -= 1;

    try {
      const response = await axios.get(
        `${API_URL}/code-challenge-steps/submissions/${taskToken}`,
        config
      );

      if (response.data.status === 'PENDING') {
        return new Promise((resolve) => {
          timerId = setTimeout(() => {
            resolve(fetchResult()); // This will return a promise
          }, retryDelay);
        });
      } else {
        clearTimeout(timerId.current);

        return response.data;
      }
    } catch (error) {
      if (!error.response || error.response.status >= 500) {
        // Retry polling if the error is a network error or a server error
        return new Promise((resolve) => {
          timerId = setTimeout(() => {
            resolve(fetchResult());
          }, retryDelay);
        });
      } else {
        clearTimeout(timerId);
        throw error;
      }
    }
  };

  return fetchResult();
};

const cancelSubmission = () => {
  clearTimeout(timerId);
  timerId = null;
};

export const codeChallengeService = {
  submitCodeChallenge,
  getSubmissionResult,
  cancelSubmission,
};
