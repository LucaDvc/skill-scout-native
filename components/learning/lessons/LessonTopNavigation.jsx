import React from 'react';
import { Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { router } from 'expo-router';
import { BackIcon } from '../../extra/icons';
import { useFullscreenContext } from '../../../context/FullscreenContext';

const LessonTopNavigation = ({ lesson, courseId }) => {
  const { isFullscreen } = useFullscreenContext();
  return !isFullscreen ? (
    <TopNavigation
      title={() => (
        <Text category='h6' style={{ maxWidth: 320 }}>{`${lesson.chapterIndex + 1}.${
          lesson.order
        } ${lesson.title}`}</Text>
      )}
      alignment='center'
      accessoryLeft={
        <TopNavigationAction
          icon={BackIcon}
          onPress={() => router.replace(`learning/${courseId}/modules`)}
        />
      }
    />
  ) : null;
};

export default LessonTopNavigation;
