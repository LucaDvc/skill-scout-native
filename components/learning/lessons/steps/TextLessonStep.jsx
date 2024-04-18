import { View, Text } from 'react-native';
import React from 'react';

const TextLessonStep = ({ lessonStep }) => {
  return (
    <View>
      <Text>TextLessonStep</Text>
      <Text>{lessonStep.id}</Text>
    </View>
  );
};

export default TextLessonStep;
