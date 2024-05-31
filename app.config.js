require('dotenv').config();

export default ({ config }) => {
  return {
    ...config,
    extra: {
      ...config.extra,
      apiUrl: process.env.EXPO_PUBLIC_API_URL,
    },
  };
};
