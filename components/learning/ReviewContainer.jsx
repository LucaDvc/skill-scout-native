import { View, StyleSheet } from 'react-native';
import { Button, Input, Layout, Spinner, Text } from '@ui-kitten/components';
import React from 'react';
import Rating from '../extra/Rating';
import { useDispatch } from 'react-redux';
import {
  getReviews,
  postReview,
  statusesReset,
} from '../../features/learning/reviews/reviewSlice';
import { useSelector } from 'react-redux';
import { EditIcon } from '../extra/icons';
import { router } from 'expo-router';
import Toast from 'react-native-root-toast';

const ReviewContainer = ({ courseId, completionRatio }) => {
  const [rating, setRating] = React.useState('');
  const [comment, setComment] = React.useState('');

  const dispatch = useDispatch();
  const { reviews, post } = useSelector((state) => state.reviews);
  const { isLoading, isError, isSuccess, message } = post;
  const { user } = useSelector((state) => state.users);

  const [ratingStatus, setRatingStatus] = React.useState('basic');

  const alreadyReviewed = reviews.some((review) => review.learner.id === user?.id);

  const handleRatingChange = (textValue) => {
    if (textValue === '' || textValue === '.') {
      setRating('');
      return;
    }
    let numericValue = Number(textValue);

    if (numericValue > 5) {
      numericValue = 5;
    } else if (numericValue < 0) {
      numericValue = 0;
    }
    setRating(numericValue);
  };

  const handleSubmit = () => {
    let isValid = true;

    if (rating === '') {
      setRatingStatus('danger');
      isValid = false;
    }

    if (isValid) {
      dispatch(postReview({ courseId, review: { rating, comment } }));
      setRatingStatus('basic');
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      dispatch(getReviews(courseId));
      Toast.show('Review submitted successfully', {
        position: Toast.positions.BOTTOM,
      });
    }

    if (isError) {
      Toast.show(message, {
        position: Toast.positions.BOTTOM,
      });
    }

    return () => {
      dispatch(statusesReset());
    };
  }, [isSuccess, isError, message]);

  return (
    <View>
      {alreadyReviewed ? (
        <Button
          appearance='ghost'
          accessoryLeft={(props) => <EditIcon {...props} />}
          onPress={() => router.push(`/learning/${courseId}/edit-review`)}
          size='medium'
        >
          Edit your review
        </Button>
      ) : completionRatio < 80 ? (
        <Layout level='2'>
          <Text style={{ margin: 16 }}>
            You need to complete at least 80% of the course to leave a review.
          </Text>
        </Layout>
      ) : (
        <View style={styles.formContainer}>
          <Text category='h6' style={styles.formTitle}>
            Leave a review
          </Text>
          <View style={styles.ratingContainer}>
            <Input
              keyboardType='numeric'
              label={(props) => <Text {...props}>Rating</Text>}
              status={ratingStatus}
              caption={'Up to 5 stars'}
              onChangeText={handleRatingChange}
              value={rating.toString()}
              disabled={isLoading}
            />
            <Rating value={rating} size='medium' style={{ marginLeft: 24 }} />
          </View>
          <Input
            label={(props) => <Text {...props}>Comment</Text>}
            multiline
            textStyle={styles.inputTextStyle}
            style={styles.input}
            value={comment}
            placeholder='Write a comment...'
            onChangeText={setComment}
            disabled={isLoading}
          />
          <Button
            onPress={handleSubmit}
            disabled={isLoading}
            accessoryRight={(props) => (isLoading ? <Spinner size='small' /> : null)}
          >
            Submit
          </Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    margin: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  formTitle: {
    marginBottom: 16,
  },
  input: {
    marginVertical: 16,
  },
  inputTextStyle: {
    minHeight: 64,
    textAlignVertical: 'top',
  },
});

export default ReviewContainer;
