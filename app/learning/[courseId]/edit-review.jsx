import { View, StyleSheet, Platform } from 'react-native';
import React from 'react';
import {
  Button,
  Input,
  Layout,
  Spinner,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import Rating from '../../../components/extra/Rating';
import { useDispatch, useSelector } from 'react-redux';
import {
  getReviews,
  getUserReview,
  statusesReset,
  updateReview,
} from '../../../features/learning/reviews/reviewSlice';
import { BackIcon } from '../../../components/extra/icons';
import { router, useLocalSearchParams } from 'expo-router/build';
import Toast from 'react-native-root-toast';

const EditReview = () => {
  const { courseId } = useLocalSearchParams();
  const [rating, setRating] = React.useState('');
  const [comment, setComment] = React.useState('');

  const dispatch = useDispatch();
  const {
    update,
    isLoading: fetchingReview,
    review,
  } = useSelector((state) => state.reviews);
  const { isLoading, isError, isSuccess, message } = update;

  const [ratingStatus, setRatingStatus] = React.useState('basic');

  React.useEffect(() => {
    dispatch(getUserReview(courseId));

    return () => {
      dispatch(statusesReset());
    };
  }, []);

  React.useEffect(() => {
    if (Object.keys(review).length > 0) {
      setRating(review.rating);
      setComment(review.comment);
    }
  }, [review]);

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
      dispatch(updateReview({ reviewId: review.id, review: { rating, comment } }));
      setRatingStatus('basic');
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      router.back();
      dispatch(getReviews(courseId));
      Toast.show('Review updated successfully', {
        position: Toast.positions.BOTTOM,
      });
    }

    if (isError) {
      Toast.show(message.toUpperCase(), {
        position: Toast.positions.BOTTOM,
      });
    }
  }, [isSuccess, isError, message]);

  return (
    <>
      <TopNavigation
        alignment='center'
        title={() => <Text category='h6'>Edit Review</Text>}
        accessoryLeft={
          <TopNavigationAction
            icon={BackIcon}
            onPress={() => {
              router.back();
            }}
          />
        }
        style={styles.topNavigation}
      />
      <Layout style={styles.container}>
        {fetchingReview ? (
          <View style={styles.loadingContainer}>
            <Spinner size='giant' />
          </View>
        ) : (
          <View style={styles.formContainer}>
            <Text category='h6' style={styles.formTitle}>
              Your review
            </Text>
            <View style={styles.ratingContainer}>
              <Input
                keyboardType='numeric'
                required
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
              accessoryRight={() => (isLoading ? <Spinner size='small' /> : null)}
            >
              Submit
            </Button>
          </View>
        )}
      </Layout>
    </>
  );
};

const styles = StyleSheet.create({
  topNavigation: {
    zIndex: 1,
    elevation: 3,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
      },
    }),
  },
  container: {
    flex: 1,
  },
  loadingContainer: {
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
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

export default EditReview;
