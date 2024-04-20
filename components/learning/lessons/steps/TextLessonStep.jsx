import { View, ScrollView, useWindowDimensions } from 'react-native';
import React from 'react';
import RenderHTML from 'react-native-render-html';
import { StyleService, useStyleSheet } from '@ui-kitten/components';
import StepsNavigationButtons from './StepsNavigationButtons';
import { useDispatch } from 'react-redux';
import {
  completeLessonStep,
  updateUiOnLessonStepComplete,
} from '../../../../features/learning/learningSlice';

const TextLessonStep = ({ lessonStep }) => {
  const { width } = useWindowDimensions();
  const styles = useStyleSheet(themedStyles);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!lessonStep.completed) {
      dispatch(completeLessonStep(lessonStep.id));
      dispatch(updateUiOnLessonStepComplete(lessonStep.id));
    }
  }, [lessonStep.id]);

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContainer}
    >
      <View style={styles.contentContainer}>
        <RenderHTML contentWidth={width} source={{ html: lessonStep.text }} />
      </View>
      <StepsNavigationButtons lessonStep={lessonStep} />
    </ScrollView>
  );
};

const themedStyles = StyleService.create({
  scrollView: {
    backgroundColor: 'color-basic-100',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  layoutContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});

export default TextLessonStep;
