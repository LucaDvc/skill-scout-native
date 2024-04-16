import React from 'react';
import BasicCourseCard from '../course-cards/BasicCourseCard';
import { getHighestRatedCourses } from '../../features/catalog/catalogSlice';
import HorizontalCourseList from '../layout/HorizontalCourseList';
import HorizontalCourseListTopNav from '../layout/HorizontalCourseListTopNav';
import { useTheme } from '@ui-kitten/components';

const HighestRatedCoursesList = () => {
  const theme = useTheme();
  return (
    <HorizontalCourseList
      actionCreator={getHighestRatedCourses}
      courseCardComponent={BasicCourseCard}
      selector={(state) => state.catalog.highestRatedCourses}
      viewMoreLink='/search/highest-rated-courses'
      ListHeaderComponent={
        <HorizontalCourseListTopNav
          title='Highest Rated Courses'
          route='/search/highest-rated-courses'
        />
      }
      listBackgroundColor={theme['color-basic-100']}
      courseListName={'highestRatedCourses'}
      hybrid={true}
    />
  );
};

export default HighestRatedCoursesList;
