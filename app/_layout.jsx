import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { default as theme } from '../theme/theme.json';
import { Stack } from 'expo-router';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from '../features/store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { initializeAuth, refreshAccessToken } from '../features/users/usersSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootSiblingParent } from 'react-native-root-siblings';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import { withLayoutContext } from 'expo-router';

const { Navigator } = createStackNavigator();

export const JsStack = withLayoutContext(Navigator);

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const init = async () => {
      dispatch(initializeAuth());
      //await AsyncStorage.clear();
    };

    init();
  }, [dispatch, initializeAuth]);

  const { refreshToken, initDone, tokenRefreshing } = useSelector((state) => state.users);

  React.useEffect(() => {
    const checkAuthStatus = async () => {
      if (initDone && refreshToken) {
        dispatch(refreshAccessToken());
      }
    };

    checkAuthStatus();
  }, [dispatch, refreshToken, initDone]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <IconRegistry icons={EvaIconsPack} />
        {initDone && !tokenRefreshing && (
          <JsStack screenOptions={{ headerShown: false }}>
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
            <Stack.Screen
              name='(catalog)/search/index'
              options={{
                headerShown: false,
              }}
            />
            <JsStack.Screen
              name='(catalog)/search/filters'
              options={{
                // Set the presentation mode to modal for filters modal route.
                ...TransitionPresets.ModalPresentationIOS,
                presentation: 'modal',
                gestureEnabled: true,
                headerShown: false,
              }}
            />
          </JsStack>
        )}
      </ApplicationProvider>
    </SafeAreaView>
  );
};

export default Index = () => (
  <Provider store={store}>
    <RootSiblingParent>
      <App />
    </RootSiblingParent>
  </Provider>
);
