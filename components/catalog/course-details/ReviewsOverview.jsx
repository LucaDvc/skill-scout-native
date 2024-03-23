import { View } from 'react-native';
import React from 'react';
import { ProgressBar, Text } from '@ui-kitten/components';
import Rating from '../../extra/Rating';

const ReviewsOverview = ({ averageRating, reviews }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', margin: 16 }}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text category='h1' style={{ fontWeight: 300 }}>
          {averageRating.toFixed(1)}
        </Text>
        <Rating value={averageRating} />
        <Text category='c1' style={{ marginTop: 4 }}>
          {reviews.length} {reviews.length > 1 ? 'reviews' : 'review'}
        </Text>
      </View>

      <View style={{ marginLeft: 16, flex: 1, justifyContent: 'center' }}>
        {Array.of(5, 4, 3, 2, 1).map((value, index) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 1,
            }}
            key={index}
          >
            <Text category='c2'>{value}</Text>
            <ProgressBar
              progress={
                reviews.filter((r) => r.rating === value).length /
                reviews.length
              }
              style={{
                flex: 1,
                marginHorizontal: 4,
                height: 6,
                borderRadius: 4,
              }}
            />
            <Text category='c2'>
              {reviews.filter((r) => r.rating === value).length}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ReviewsOverview;
