import React from 'react';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import { HomeIcon, PersonIcon, SearchIcon } from '../extra/icons';

export default function BottomTabBar({ navigation, state }) {
  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
    >
      <BottomNavigationTab title='Home' icon={HomeIcon} />
      <BottomNavigationTab title='Catalog' icon={SearchIcon} />
      <BottomNavigationTab title='Profile' icon={PersonIcon} />
    </BottomNavigation>
  );
}
