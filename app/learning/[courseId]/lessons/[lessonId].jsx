import { View, StyleSheet } from 'react-native';
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseById } from '../../../../features/learning/learningSlice';
import Toast from 'react-native-root-toast';
import {
  Spinner,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { BackIcon } from '../../../../components/extra/icons';
import LessonStepsTabs from '../../../../components/learning/lessons/steps/LessonStepsTabs';

const Lesson = () => {
  const { lessonId, courseId } = useLocalSearchParams();

  const [lesson, setLesson] = React.useState(null);
  const [findingLesson, setFindingLesson] = React.useState(true);
  const [chapterIndex, setChapterIndex] = React.useState(null);

  const dispatch = useDispatch();
  const { course, isLoading, isError, isSuccess } = useSelector(
    (state) => state.learning
  );

  React.useEffect(() => {
    if (!course) {
      dispatch(getCourseById(courseId));
    }
  }, [courseId]);

  React.useEffect(() => {
    if (course) {
      const lesson = course.chapters
        .map((chapter) => chapter.lessons)
        .flat()
        .find((lesson) => lesson.id === lessonId);

      if (lesson) {
        setLesson(lesson);
        setFindingLesson(false);
        setChapterIndex(
          course.chapters.findIndex((chapter) =>
            chapter.lessons.some((lesson) => lesson.id === lessonId)
          )
        );
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
    <Error
      state={'learning'}
      refreshCallback={() => dispatch(getCourseById(courseId))}
    />
  ) : (
    <View>
      <TopNavigation
        title={() => (
          <Text category='h6'>{`${chapterIndex + 1}.${lesson.order} ${
            lesson.title
          }`}</Text>
        )}
        alignment='center'
        accessoryLeft={
          <TopNavigationAction icon={BackIcon} onPress={() => router.back()} />
        }
      />
      <LessonStepsTabs lesson={lesson} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Lesson;
