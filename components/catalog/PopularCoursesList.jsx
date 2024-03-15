import React from 'react';
import BasicCourseCard from '../course-cards/BasicCourseCard';
import { getPopularCourses } from '../../features/catalog/catalogSlice';
import HorizontalCourseList from '../layout/HorizontalCourseList';
import HorizontalCourseListTopNav from '../layout/HorizontalCourseListTopNav';

const PopularCoursesList = () => {
  return (
    <HorizontalCourseList
      actionCreator={getPopularCourses}
      courseCardComponent={BasicCourseCard}
      selector={(state) => state.catalog.popularCourses}
      viewMoreLink='/popular-courses'
      ListHeaderComponent={
        <HorizontalCourseListTopNav
          title='Popular Courses'
          route='/popular-courses'
        />
      }
      listBackgroundColor={'#fff'}
      courseListName={'popularCourses'}
    />
  );
};

export default PopularCoursesList;
