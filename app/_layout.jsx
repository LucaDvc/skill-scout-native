import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { default as theme } from '../theme/theme.json';
import { Stack } from 'expo-router';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Provider, useDispatch } from 'react-redux';
import { store } from '../features/store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { initializeAuth } from '../features/users/usersSlice';

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch, initializeAuth]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <IconRegistry icons={EvaIconsPack} />
        <Stack>
          <Stack.Screen
            name='(root)/(tabs)'
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='(catalog)/[courseId]/(tabs)'
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='(users)'
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </ApplicationProvider>
    </SafeAreaView>
  );
};

export default Index = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
