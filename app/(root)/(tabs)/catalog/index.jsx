import React from 'react';
import { Layout, Spinner, Text } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import { getPopularCourses } from '../../../../features/catalog/catalogSlice';

export default function CatalogScreen() {
  const dispatch = useDispatch();
  const { popularCourses, isError, isSuccess, isLoading, message } =
    useSelector((state) => state.catalog.recommendedCourses);

  React.useEffect(() => {
    dispatch(getPopularCourses());
  }, [dispatch]);

  React.useEffect(() => {
    if (isError) {
      console.log('Error:', message);
    }
  }, [isError, message, isSuccess, popularCourses]);

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {isLoading && <Spinner size='giant' />}
      {isSuccess && (
        <>
          <Text category='h1'>Catalog</Text>
          <Text category='h6'>
            {popularCourses.map((course) => (
              <Text key={course.id}>{course.title}</Text>
            ))}
          </Text>
        </>
      )}
    </Layout>
  );
}
