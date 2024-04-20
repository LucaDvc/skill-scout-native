import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Layout, Spinner } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseById } from '../../../../features/learning/learningSlice';
import Error from '../../../../components/layout/Error';
import LearningCourseDetails from '../../../../components/learning/LearningCourseDetails';

const LearningCourseDetailsTabsLayout = () => {
  const { courseId } = useLocalSearchParams();

  const dispatch = useDispatch();
  const { course, isLoading, isError, isSuccess } = useSelector(
    (state) => state.learning
  );

  React.useEffect(() => {
    if (Object.keys(course).length === 0 || course.id !== courseId) {
      dispatch(getCourseById(courseId));
    }
  }, [courseId]);

  return isLoading ? (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Spinner size='giant' />
    </Layout>
  ) : Object.keys(course).length > 0 && isSuccess ? (
    <LearningCourseDetails course={course} />
  ) : (
    isError && (
      <Error
        stateName='learning'
        refreshCallback={() => dispatch(getCourseById(courseId))}
      />
    )
  );
};

export default LearningCourseDetailsTabsLayout;
