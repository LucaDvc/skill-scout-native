import React from 'react';
import { Stack } from 'expo-router';

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='register' options={{ headerShown: false }} />
      <Stack.Screen name='confirm-email' options={{ headerShown: false }} />
    </Stack>
  );
};

export default AuthLayout;
