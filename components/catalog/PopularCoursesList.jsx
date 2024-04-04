import React from 'react';
import BasicCourseCard from '../course-cards/BasicCourseCard';
import { getPopularCourses } from '../../features/catalog/catalogSlice';
import HorizontalCourseList from '../layout/HorizontalCourseList';
import HorizontalCourseListTopNav from '../layout/HorizontalCourseListTopNav';
import { useTheme } from '@ui-kitten/components';

const PopularCoursesList = () => {
  const theme = useTheme();
  return (
    <HorizontalCourseList
      actionCreator={getPopularCourses}
      courseCardComponent={BasicCourseCard}
      selector={(state) => state.catalog.popularCourses}
      viewMoreLink='/search/popular-courses'
      ListHeaderComponent={
        <HorizontalCourseListTopNav
          title='Popular Courses'
          route='/search/popular-courses'
        />
      }
      listBackgroundColor={theme['color-basic-100']}
      courseListName={'popularCourses'}
    />
  );
};

export default PopularCoursesList;
