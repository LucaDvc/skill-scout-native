import axios from 'axios';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const API_URL = `${BASE_URL}/api/learning`;

const getReviews = async (token, courseId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API_URL}/courses/${courseId}/reviews/`,
    config
  );

  return response.data;
};

const postReveiw = async (token, courseId, review) => {
  console.log(review);
  console.log(courseId);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${API_URL}/courses/${courseId}/reviews/`,
    review,
    config
  );
  console.log(response);

  return response.data;
};

const updateReview = async (token, reviewId, review) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${API_URL}/reviews/${reviewId}/`,
    review,
    config
  );

  return response.data;
};

const learningService = {
  getReviews,
  postReveiw,
  updateReview,
};

export default learningService;
