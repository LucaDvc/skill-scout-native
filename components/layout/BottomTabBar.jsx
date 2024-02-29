import React from 'react';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';

const PersonIcon = (props) => <Icon {...props} name='person' />;

const HomeIcon = (props) => <Icon {...props} name='home' />;

const SearchIcon = (props) => <Icon {...props} name='search' />;

export default function BottomTabBar({ navigation, state }) {
  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
      // appearance='noIndicator'
    >
      <BottomNavigationTab title='Home' icon={HomeIcon} />
      <BottomNavigationTab title='Catalog' icon={SearchIcon} />
      <BottomNavigationTab title='Profile' icon={PersonIcon} />
    </BottomNavigation>
  );
}
