import { View, Text } from 'react-native';
import React from 'react';
import { Button } from '@ui-kitten/components';
import { ArrowLeftIcon, ArrowRightIcon } from '../../../extra/icons';

const StepsNavigationButtons = ({ lesson, lessonStep }) => {
  const showPreviousLessonButton = lessonStep.order === 1;
  const showNextLessonButton = lessonStep.order === lesson.lesson_steps.length;
  const showNextStepButton = lessonStep.order !== lesson.lesson_steps.length;

  const handleNextStep = () => {
    console.log('next step');
  };

  const handleNextLesson = () => {
    console.log('next lesson');
  };

  const handlePreviousLesson = () => {
    console.log('previous lesson');
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-end',
        margin: 16,
      }}
    >
      {showNextStepButton && (
        <Button appearance='filled' onPress={handleNextStep}>
          Next
        </Button>
      )}
      {showNextLessonButton && (
        <Button
          appearance='outline'
          style={{ backgroundColor: 'transparent' }}
          accessoryRight={ArrowRightIcon}
          onPress={handleNextLesson}
        >
          Next lesson
        </Button>
      )}
      {showPreviousLessonButton && (
        <Button
          appearance='outline'
          style={{ backgroundColor: 'transparent' }}
          accessoryLeft={ArrowLeftIcon}
          onPress={handlePreviousLesson}
        >
          Previous lesson
        </Button>
      )}
    </View>
  );
};

export default StepsNavigationButtons;
