import { View, ScrollView, RefreshControl } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseById } from '../../../../features/catalog/catalogSlice';
import { Divider, Layout, useTheme } from '@ui-kitten/components';
import ReviewsOverview from '../../../../components/course-details/ReviewsOverview';
import ReviewCard from '../../../../components/course-details/ReviewCard';

const Reviews = () => {
  const { courseId } = useLocalSearchParams();
  const theme = useTheme();

  const dispatch = useDispatch();
  const { course, isLoading } = useSelector((state) => state.catalog);

  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    setRefreshing(isLoading);
  }, [isLoading]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getCourseById(courseId));
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{ backgroundColor: theme['color-basic-100'] }}
    >
      <Layout>
        <ReviewsOverview
          averageRating={course.average_rating}
          reviews={course.reviews}
        />

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
