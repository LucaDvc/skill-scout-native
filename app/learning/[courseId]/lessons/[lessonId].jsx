import { View } from 'react-native';
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseById } from '../../../../features/learning/learningSlice';
import Toast from 'react-native-root-toast';
import { Spinner, StyleService, useStyleSheet } from '@ui-kitten/components';
import LessonStepsTabs from '../../../../components/learning/lessons/steps/LessonStepsTabs';
import { LessonProvider } from '../../../../context/LessonContext';
import { FullscreenProvider } from '../../../../context/FullscreenContext';
import LessonTopNavigation from '../../../../components/learning/lessons/LessonTopNavigation';

const Lesson = () => {
  const { lessonId, courseId } = useLocalSearchParams();
  const styles = useStyleSheet(themedStyles);

  const [lesson, setLesson] = React.useState(null);
  const [findingLesson, setFindingLesson] = React.useState(true);

  const dispatch = useDispatch();
  const { course, isLoading, isError } = useSelector((state) => state.learning);

  React.useEffect(() => {
    if (Object.keys(course).length === 0 || course.id !== courseId) {
      dispatch(getCourseById(courseId));
    }
  }, [courseId]);

  React.useEffect(() => {
    if (Object.keys(course).length !== 0) {
      const lesson = course.chapters
        .map((chapter) => chapter.lessons)
        .flat()
        .find((lesson) => lesson.id === lessonId);

      if (lesson) {
        const chapterIdx = course.chapters.findIndex((chapter) =>
          chapter.lessons.some((lesson) => lesson.id === lessonId)
        );
        setLesson({ ...lesson, chapterIndex: chapterIdx });
        setFindingLesson(false);
      } else {
        router.back();
        Toast.show('Lesson not found', {
          duration: Toast.durations.LONG,
        });
      }
    }
  }, [course, lessonId]);

  return (findingLesson || isLoading) && !isError ? (
    <View style={styles.container}>
      <Spinner size='giant' />
    </View>
  ) : isError ? (
    <Error state={'learning'} refreshCallback={() => dispatch(getCourseById(courseId))} />
  ) : (
    <FullscreenProvider>
      <View>
        <LessonTopNavigation lesson={lesson} courseId={courseId} />
        <LessonProvider lesson={lesson}>
          <LessonStepsTabs />
        </LessonProvider>
      </View>
    </FullscreenProvider>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'color-basic-100',
  },
});

export default Lesson;
