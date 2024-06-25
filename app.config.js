require('dotenv').config();

export default ({ config }) => {
  return {
    ...config,
    extra: {
      ...config.extra,
      apiUrl: process.env.EXPO_PUBLIC_API_URL,
      judge0Url: process.env.EXPO_PUBLIC_JUDGE0_URL,
      judge0Token: process.env.EXPO_PUBLIC_JUDGE0_AUTH_TOKEN,
    },
  };
};
