import React from 'react';
import { View } from 'react-native';
import Star from './Star';

const Rating = ({ value, style, size = 'small' }) => {
  // Calculate the number of full stars, half stars, and empty stars
  value = !value ? 0 : value;
  const roundedValue = Math.round(value * 2) / 2;
  const fullStars = Math.floor(roundedValue);
  const emptyStars = 5 - fullStars;

  return (
    <View
      style={{
        flexDirection: 'row',
        ...style,
      }}
    >
      {[...Array(fullStars)].map((_, index) => (
        <Star key={`full-${index}`} filled size={size} />
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <Star key={`empty-${index}`} size={size} />
      ))}
    </View>
  );
};

export default Rating;
