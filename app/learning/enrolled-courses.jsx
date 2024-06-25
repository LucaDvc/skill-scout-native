import { View, StyleSheet, Platform, RefreshControl } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import {
  Layout,
  List,
  Spinner,
  Text,
  TopNavigation,
  TopNavigationAction,
  useTheme,
} from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { getCourses } from '../../features/learning/learningSlice';
import { BackIcon } from '../../components/extra/icons';
import { renderSearchedCourse } from '../../utils/courseListUtils';

const EnrolledCoursesPage = () => {
  const theme = useTheme();

  const dispatch = useDispatch();
  const { courses, isLoading, isError } = useSelector((state) => state.learning);

  React.useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(getCourses());
  };

  if (isError) {
    return <Error stateName='learning' refreshCallback={handleRefresh} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <TopNavigation
        title={() => <Text category='h6'>My Courses</Text>}
        alignment='center'
        accessoryLeft={
          <TopNavigationAction
            icon={BackIcon}
            onPress={() => {
              router.back();
            }}
          />
        }
        style={styles.topNavigation}
      />
      <Layout style={styles.container}>
        {isLoading && courses.length === 0 ? (
          <Spinner size='giant' />
        ) : courses.length > 0 ? (
          <List
            refreshControl={
              <RefreshControl onRefresh={handleRefresh} refreshing={isLoading} />
            }
            data={courses}
            renderItem={renderSearchedCourse}
            style={{ backgroundColor: theme['color-basic-100'], marginVertical: 8 }}
          />
        ) : (
          <ScrollView
            contentContainerStyle={styles.container}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
            }
          >
            <Text category='h5'>No results found</Text>
          </ScrollView>
        )}
      </Layout>
    </View>
  );
};

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
    flex: 1,
  },
});

export default EnrolledCoursesPage;
