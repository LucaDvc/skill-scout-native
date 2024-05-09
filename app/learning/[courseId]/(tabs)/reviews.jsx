import { View, ScrollView, RefreshControl, StyleSheet } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Layout, useTheme } from '@ui-kitten/components';
import ReviewsOverview from '../../../../components/course-details/ReviewsOverview';
import ReviewCard from '../../../../components/course-details/ReviewCard';
import ReviewContainer from '../../../../components/learning/ReviewContainer';
import { getReviews } from '../../../../features/learning/reviews/reviewSlice';

const Reviews = () => {
  const theme = useTheme();

  const dispatch = useDispatch();

  const { course } = useSelector((state) => state.learning);

  const { reviews, averageRating, isLoading } = useSelector((state) => state.reviews);

  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    dispatch(getReviews(course.id));
  }, [course.id]);

  React.useEffect(() => {
    setRefreshing(isLoading);
  }, [isLoading]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getReviews(course.id));
  }, [course.id]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      style={{ backgroundColor: theme['color-basic-100'] }}
    >
      <Layout>
        {isLoading ? null : (
          <>
            <ReviewsOverview averageRating={averageRating} reviews={reviews} />

            <Divider style={styles.divider} />

            <ReviewContainer
              courseId={course.id}
              completionRatio={course.learner_progress.completion_ratio}
            />

            <Divider style={styles.divider} />

            {reviews.map((review) => (
              <View key={review.id}>
                <ReviewCard review={review} />
                <Divider style={styles.divider} />
              </View>
            ))}
            <View style={styles.emptyContainer}></View>
          </>
        )}
      </Layout>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    height: 64,
  },
  divider: {
    marginVertical: 4,
  },
});

export default Reviews;
