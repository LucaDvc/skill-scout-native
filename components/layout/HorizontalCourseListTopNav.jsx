import {
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React from 'react';
import { ForwardIcon } from '../extra/icons';
import { router } from 'expo-router';

const HorizontalCourseListTopNav = ({ title, route }) => {
  return (
    <TopNavigation
      title={() => <Text category='h6'>{title}</Text>}
      style={{
        height: 36,
        paddingHorizontal: 24,
      }}
      accessoryRight={
        <TopNavigationAction
          icon={ForwardIcon}
          onPress={() => {
            router.push(route);
          }}
        />
      }
    />
  );
};

export default HorizontalCourseListTopNav;
