import React from 'react';
import { Tabs } from 'expo-router';
import BottomTabBar from '../../../components/layout/BottomTabBar';

const TabsLayout = () => {
  return (
    <Tabs tabBar={(props) => <BottomTabBar {...props} />}>
      <Tabs.Screen
        name='index'
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Tabs.Screen
        name='catalog'
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
