import React from 'react';
import {
  Card,
  Divider,
  Layout,
  Text,
  TopNavigation,
  useTheme,
} from '@ui-kitten/components';
import { ScrollView, StyleSheet, Platform, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import PopularCoursesList from '../../../components/catalog/PopularCoursesList';
import { useDispatch, useSelector } from 'react-redux';
import { getPopularCourses } from '../../../features/catalog/catalogSlice';
import MyCourses from '../../../components/home/MyCourses';
import { getCourses } from '../../../features/learning/learningSlice';
import Discover from '../../../components/home/Discover';
import { useCourseToContinue } from '../../../hooks/useCourseToContinue';
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen() {
  const theme = useTheme();

  const dispatch = useDispatch();

  const { setRefresh, refresh } = useCourseToContinue();

  const { accessToken } = useSelector((state) => state.users);

  const onRefresh = React.useCallback(() => {
    dispatch(getPopularCourses());
    if (accessToken) {
      dispatch(getCourses());
      setRefresh((prevState) => prevState + 1);
    }
  }, [dispatch, setRefresh]);

  useFocusEffect(
    React.useCallback(() => {
      onRefresh();
    }, [])
  );

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme['color-basic-100'] }}
      refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}
    >
      <TopNavigation
        alignment='center'
        title={() => <Text category='h6'>Home</Text>}
        style={styles.topNavigation}
      />
      <ScrollView
        style={{ flex: 1, backgroundColor: theme['color-basic-100'] }}
        showsVerticalScrollIndicator={false}
      >
        <Layout level='1' style={{ flex: 1 }}>
          {/* Discover or continue courses */}
          <Discover key={refresh ? refresh : 'no-course'} />
          {/* My courses */}
          <Divider />

          <MyCourses />

          <Divider />

          {/* Popular */}
          <PopularCoursesList />
        </Layout>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  topNavigation: {
    zIndex: 1,
    elevation: 3,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
      },
    }),
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
