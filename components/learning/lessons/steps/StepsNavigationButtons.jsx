import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Button } from '@ui-kitten/components';
import { ArrowLeftIcon, ArrowRightIcon } from '../../../extra/icons';
import { useSelector } from 'react-redux';
import { router } from 'expo-router';
import { useLessonContext } from '../../../../context/LessonContext';

const StepsNavigationButtons = ({ lessonStep }) => {
  const { course } = useSelector((state) => state.learning);
  const { lesson, setSelectedStepIndex } = useLessonContext();

  if (Object.keys(course).length === 0) {
    return null;
  }

  const showPreviousLessonButton = React.useMemo(() => {
    const isFirstLessonInCourse =
      course.chapters[0].lessons[0].id === lesson.id;

    return !isFirstLessonInCourse && lessonStep.order === 1;
  }, [lessonStep.id]);

  const showNextLessonButton = React.useMemo(() => {
    const isLastLessonInCourse =
      course.chapters[course.chapters.length - 1].lessons[
        course.chapters[course.chapters.length - 1].lessons.length - 1
      ].id === lesson.id;

    return (
      !isLastLessonInCourse && lessonStep.order === lesson.lesson_steps.length
    );
  }, [lessonStep.id]);

  const showNextStepButton = lessonStep.order !== lesson.lesson_steps.length;

  const showFinishLessonButton = React.useMemo(() => {
    const isLastLessonInCourse =
      course.chapters[course.chapters.length - 1].lessons[
        course.chapters[course.chapters.length - 1].lessons.length - 1
      ].id === lesson.id;

    return (
      isLastLessonInCourse && lessonStep.order === lesson.lesson_steps.length
    );
  }, [lessonStep.id]);

  const handleNextStep = () => {
    setSelectedStepIndex((prevIndex) => prevIndex + 1);
  };

  const handleFinishLesson = () => router.replace(`learning/${course.id}`);

  const handleNextLesson = () => {
    const isLastLessonInChapter =
      course.chapters[lesson.chapterIndex].lessons.length === lesson.order;
    const nextLesson = isLastLessonInChapter
      ? course.chapters[lesson.chapterIndex + 1].lessons[0]
      : course.chapters[lesson.chapterIndex].lessons[lesson.order];

    router.replace(`learning/${course.id}/lessons/${nextLesson.id}`);
  };

  const handlePreviousLesson = () => {
    const isFirstLessonInChapter = lesson.order === 1;
    const previousLesson = isFirstLessonInChapter
      ? course.chapters[lesson.chapterIndex - 1].lessons[
          course.chapters[lesson.chapterIndex - 1].lessons.length - 1
        ]
      : course.chapters[lesson.chapterIndex].lessons[lesson.order - 2];

    router.replace(`learning/${course.id}/lessons/${previousLesson.id}`);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-end',
        marginHorizontal: 16,
        marginTop: 16,
        marginBottom: 24,
      }}
    >
      {showNextStepButton && (
        <Button
          appearance='filled'
          style={styles.filledButton}
          onPress={handleNextStep}
        >
          Next
        </Button>
      )}
      {showFinishLessonButton && (
        <Button
          appearance='filled'
          style={styles.filledButton}
          onPress={handleFinishLesson}
        >
          Finish lesson
        </Button>
      )}
      {showNextLessonButton && (
        <Button
          appearance='outline'
          style={styles.outlinedButton}
          accessoryRight={ArrowRightIcon}
          onPress={handleNextLesson}
        >
          Next lesson
        </Button>
      )}
      {showPreviousLessonButton && (
        <Button
          appearance='outline'
          style={styles.outlinedButton}
          accessoryLeft={ArrowLeftIcon}
          onPress={handlePreviousLesson}
        >
          Previous lesson
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  filledButton: {
    marginVertical: 8,
  },
  outlinedButton: {
    marginVertical: 8,
    backgroundColor: 'transparent',
  },
});

export default StepsNavigationButtons;
