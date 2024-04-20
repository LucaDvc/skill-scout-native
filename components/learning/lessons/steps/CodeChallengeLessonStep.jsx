import { ScrollView, View } from 'react-native';
import React from 'react';
import { StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { useDispatch } from 'react-redux';
import StepsNavigationButtons from './StepsNavigationButtons';

const CodeChallengeLessonStep = ({ lessonStep }) => {
  const styles = useStyleSheet(themedStyles);
  const dispatch = useDispatch();

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContainer}
    >
      <View style={styles.contentContainer}>
        <Text>Code Challenge</Text>
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

export default CodeChallengeLessonStep;
