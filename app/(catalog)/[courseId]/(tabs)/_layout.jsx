import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import CatalogCourseDetails from '../../../../components/catalog/course-details/CatalogCourseDetails';
import { Layout, Spinner } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCourseById,
  reset,
} from '../../../../features/catalog/catalogSlice';
import Error from '../../../../components/layout/Error';

const CourseDetailsTabsLayout = () => {
  const { courseId } = useLocalSearchParams();

  const dispatch = useDispatch();
  const { course, isLoading, isError, isSuccess } = useSelector(
    (state) => state.catalog
  );

  React.useEffect(() => {
    dispatch(getCourseById(courseId));

    return () => {
      dispatch(reset());
    };
  }, [courseId]);

  return isLoading ? (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Spinner size='giant' />
    </Layout>
  ) : isSuccess ? (
    <CatalogCourseDetails course={course} />
  ) : (
    isError && (
      <Error stateName='catalog' action={() => getCourseById(courseId)} />
    )
  );
};

export default CourseDetailsTabsLayout;
