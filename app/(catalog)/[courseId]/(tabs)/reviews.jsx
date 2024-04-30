import { View, ScrollView, RefreshControl } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseById } from '../../../../features/catalog/catalogSlice';
import { Divider, Layout, useTheme } from '@ui-kitten/components';
import ReviewsOverview from '../../../../components/course-details/ReviewsOverview';
import ReviewCard from '../../../../components/course-details/ReviewCard';

const Reviews = () => {
  const theme = useTheme();

  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.catalog);

  const onRefresh = React.useCallback(() => {
    dispatch(getCourseById(course.id));
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}
      style={{ backgroundColor: theme['color-basic-100'] }}
    >
      <Layout>
        <ReviewsOverview averageRating={course.average_rating} reviews={course.reviews} />

        <Divider style={{ marginVertical: 4 }} />
        {course.reviews.map((review) => (
          <View key={review.id}>
            <ReviewCard review={review} />
            <Divider style={{ marginVertical: 4 }} />
          </View>
        ))}
        <View style={{ height: 64 }}></View>
      </Layout>
    </ScrollView>
  );
};

export default Reviews;
