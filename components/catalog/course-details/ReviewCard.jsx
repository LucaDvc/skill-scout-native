import { Pressable, View } from 'react-native';
import React from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { Avatar, Text } from '@ui-kitten/components';
import Rating from '../../extra/Rating';
import awsConstants from '../../../constants/awsConstants';
import { router } from 'expo-router';

const ReviewCard = ({ review }) => {
  return (
    <View style={{ margin: 16 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Pressable
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => router.push(`(users)/profile/${review.learner.id}`)}
        >
          <Avatar
            source={{
              uri:
                review.learner.picture || awsConstants.DEFAULT_USER_PICTURE_URL,
            }}
            shape='rounded'
          />
          <View style={{ marginLeft: 16 }}>
            <Text category='c1'>{`${formatDistanceToNow(
              parseISO(review.creation_date)
            )} ago`}</Text>
            <Text category='p1'>
              {review.learner.first_name} {review.learner.last_name}
            </Text>
          </View>
        </Pressable>
        <Rating value={review.rating} />
      </View>
      {review.comment && (
        <Text category='p2' style={{ marginTop: 8, marginLeft: 56 }}>
          {review.comment}
        </Text>
      )}
    </View>
  );
};

export default ReviewCard;
