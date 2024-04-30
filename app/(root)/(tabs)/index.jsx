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
import { useDispatch } from 'react-redux';
import { getPopularCourses } from '../../../features/catalog/catalogSlice';
import MyCourses from '../../../components/home/MyCourses';
import { getCourses } from '../../../features/learning/learningSlice';

export default function HomeScreen() {
  const theme = useTheme();

  const dispatch = useDispatch();

  const onRefresh = React.useCallback(() => {
    dispatch(getPopularCourses());
    dispatch(getCourses());
  }, []);

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
          {/* Discover courses */}
          <Card
            style={{ padding: 12, borderRadius: 12, margin: 16 }}
            onPress={() => router.push('/catalog')}
          >
            <Text>
              <Text style={{ fontWeight: 'bold' }}>Discover</Text> free online courses.
              Tap to find
            </Text>
          </Card>

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
