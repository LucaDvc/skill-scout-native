import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { default as theme } from '../theme/theme.json';
import { Stack } from 'expo-router';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Provider } from 'react-redux';
import { store } from '../features/store';

export default () => (
  <Provider store={store}>
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <IconRegistry icons={EvaIconsPack} />
      <Stack>
        <Stack.Screen
          name='(tabs)'
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </ApplicationProvider>
  </Provider>
);
