import React from 'react';
import { Tab, TabBar } from '@ui-kitten/components';

export default function CatalogTabBar({ navigation, state }) {
  return (
    <TabBar
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
      style={{ height: 40 }}
    >
      <Tab title='Info' />
      <Tab title='Reviews' />
      <Tab title='Modules' />
    </TabBar>
  );
}
