import React from 'react';
import BasicCourseCard from '../course-cards/BasicCourseCard';
import { getActiveCourses } from '../../features/teaching/teachingSlice';
import HorizontalCourseList from '../layout/HorizontalCourseList';
import HorizontalCourseListTopNav from '../layout/HorizontalCourseListTopNav';
import { Text } from '@ui-kitten/components';
import { StyleSheet, Platform, Image } from 'react-native';

const PublishedCoursesList = () => {
  return (
    <HorizontalCourseList
      actionCreator={getActiveCourses}
      courseCardComponent={BasicCourseCard}
      selector={(state) => state.teaching}
      ListHeaderComponent={
        <HorizontalCourseListTopNav
          title='My Published Courses'
          route='/published-courses'
        />
      }
      listBackgroundColor={'#fff'}
      NoResultsComponent={
        <>
          <Image
            source={require('../../assets/mascot-pointer.png')}
            style={{ height: 150, width: 150 }}
          />
          <Text
            category='s1'
            style={{ textAlign: 'center', fontWeight: 'bold' }}
          >
            Here you will be able to preview the courses you publish.
          </Text>
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  card: {
    width: 360,
    height: 250,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    elevation: 3,
    // shadow properties for iOS
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
});

export default PublishedCoursesList;
