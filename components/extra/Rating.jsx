import React from 'react';
import { View } from 'react-native';
import Star from './Star';

const Rating = ({ value }) => {
  // Calculate the number of full stars, half stars, and empty stars
  value = !value ? 0 : value;
  const roundedValue = Math.round(value * 2) / 2;
  const fullStars = Math.floor(roundedValue);
  const emptyStars = 5 - fullStars;

  return (
    <View style={{ flexDirection: 'row' }}>
      {[...Array(fullStars)].map((_, index) => (
        <Star key={`full-${index}`} filled />
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <Star key={`empty-${index}`} />
      ))}
    </View>
  );
};

export default Rating;
