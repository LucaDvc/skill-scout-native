import React from 'react';
import { Stack } from 'expo-router';

const ProfileLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='edit' options={{ headerShown: false }} />
    </Stack>
  );
};

export default ProfileLayout;
