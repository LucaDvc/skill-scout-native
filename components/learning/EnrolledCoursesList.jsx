import React from 'react';
import EnrolledCourseCard from '../course-cards/EnrolledCourseCard';
import { getCourses } from '../../features/learning/learningSlice';
import HorizontalCourseList from '../layout/HorizontalCourseList';
import HorizontalCourseListTopNav from '../layout/HorizontalCourseListTopNav';

const EnrolledCoursesList = () => {
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
      listBackgroundColor={'#fff'}
    />
  );
};

export default EnrolledCoursesList;
