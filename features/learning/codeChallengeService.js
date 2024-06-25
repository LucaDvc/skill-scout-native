import axios from 'axios';
import Constants from 'expo-constants';

const BASE_URL = Constants.expoConfig.extra.apiUrl;
const API_URL = `${BASE_URL}/api/learning`;

const JUDGE0_API_URL = Constants.expoConfig.extra.judge0Url;
const JUDGE0_AUTH_TOKEN = Constants.expoConfig.extra.judge0Token;

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

  const fetchResult = async (retriesLeft) => {
    if (retriesLeft === 0) {
      clearTimeout(timerId);
      throw new Error('Max retries exceeded');
    }

    try {
      const response = await axios.get(
        `${API_URL}/code-challenge-steps/submissions/${taskToken}`,
        config
      );

      if (response.data.status === 'PENDING') {
        return new Promise((resolve) => {
          timerId = setTimeout(() => {
            resolve(fetchResult(retriesLeft - 1)); // This will return a promise
          }, retryDelay);
        });
      } else {
        clearTimeout(timerId);
        return response.data;
      }
    } catch (error) {
      if (!error.response || error.response.status >= 500) {
        // Retry polling if the error is a network error or a server error
        return new Promise((resolve) => {
          timerId = setTimeout(() => {
            resolve(fetchResult(retriesLeft - 1));
          }, retryDelay);
        });
      } else {
        clearTimeout(timerId);
        throw error;
      }
    }
  };

  return fetchResult(maxRetries);
};

const cancelSubmission = () => {
  clearTimeout(timerId);
  timerId = null;
};

const runCode = async (code, testCase, languageId) => {
  const config = {
    headers: {
      'X-Auth-Token': JUDGE0_AUTH_TOKEN,
    },
  };

  const request = {
    source_code: code,
    language_id: languageId,
    stdin: testCase.input,
    expected_output: testCase.expected_output,
  };

  const response = await axios.post(
    `${JUDGE0_API_URL}/submissions?base64_encoded=true&wait=true`,
    request,
    config
  );

  return response;
};

const getCodeChallenge = async (stepId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/code-challenge-steps/${stepId}/`, config);

  console.log(response.data);

  return response.data;
};

export const codeChallengeService = {
  submitCodeChallenge,
  getSubmissionResult,
  cancelSubmission,
  runCode,
  getCodeChallenge,
};
