import React from 'react';
import EnrolledCourseCard from '../course-cards/EnrolledCourseCard';
import { getCourses } from '../../features/learning/learningSlice';
import HorizontalCourseList from '../layout/HorizontalCourseList';
import HorizontalCourseListTopNav from '../layout/HorizontalCourseListTopNav';
import { Button, Text, useTheme } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { PlusIcon } from '../extra/icons';
import { router } from 'expo-router';

const EnrolledCoursesList = () => {
  const theme = useTheme();
  return (
    <HorizontalCourseList
      actionCreator={getCourses}
      courseCardComponent={EnrolledCourseCard}
      selector={(state) => state.learning}
      ListHeaderComponent={
        <HorizontalCourseListTopNav
          title='Enrolled Courses'
          route='/enrolled-courses'
        />
      }
      listBackgroundColor={theme['color-basic-100']}
      NoResultsComponent={
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>
            You have not enrolled in any courses yet
          </Text>
          <Button
            accessoryLeft={PlusIcon}
            appearance='outline'
            style={{
              marginTop: 16,
              backgroundColor: 'inherit',
            }}
            onPress={() => router.push('/catalog')}
          >
            Search for courses in Catalog
          </Button>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default EnrolledCoursesList;
