import React from 'react';
import { Icon, useTheme } from '@ui-kitten/components';

const Star = ({ filled }) => {
  const theme = useTheme();
  const iconName = filled ? 'star' : 'star-outline';
  return (
    <Icon
      name={iconName}
      fill={filled ? theme['color-primary-500'] : theme['color-basic-700']} // Gold color for filled, grey for empty
      width={16}
      height={16}
    />
  );
};

export default Star;
