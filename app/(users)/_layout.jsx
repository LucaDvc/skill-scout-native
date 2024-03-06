import React from 'react';
import { Stack } from 'expo-router';

const UsersLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='auth'
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default UsersLayout;
