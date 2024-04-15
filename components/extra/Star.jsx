import React from 'react';
import { Icon, useTheme } from '@ui-kitten/components';

const Star = ({ filled, size }) => {
  const theme = useTheme();
  const iconName = filled ? 'star' : 'star-outline';
  let dimensions;
  switch (size) {
    case 'small':
      dimensions = 16;
      break;
    case 'medium':
      dimensions = 24;
      break;
    case 'large':
      dimensions = 32;
      break;
    default:
      dimensions = 16;
  }

  return (
    <Icon
      name={iconName}
      fill={filled ? theme['color-primary-500'] : theme['color-basic-700']}
      width={dimensions}
      height={dimensions}
    />
  );
};

export default Star;
