import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import learningService from '../features/learning/learningService';

export const useCourseToContinue = () => {
  const { accessToken, user } = useSelector((state) => state.users);
  const [courseToContinue, setCourseToContinue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchContinueCourse = async () => {
      setLoading(true);
      setError(false);
      if (user && accessToken) {
        try {
          const course = JSON.parse(await AsyncStorage.getItem(`continue-${user.id}`));
          if (course) {
            setCourseToContinue({ ...course });
          } else {
            try {
              const courses = await learningService.getCourses(accessToken);
              if (courses.length > 0) {
                const firstUncompletedCourse = courses.find(
                  (course) => course.learner_progress.completion_ratio < 100
                );
                if (firstUncompletedCourse) {
                  const continueCourseData = {
                    id: firstUncompletedCourse.id,
                    image: firstUncompletedCourse.image,
                    title: firstUncompletedCourse.title,
                    totalLessons: firstUncompletedCourse.lessons_count,
                    completedLessons:
                      firstUncompletedCourse.learner_progress.completed_lessons.length,
                    lessonId: firstUncompletedCourse.learner_progress.last_stopped_lesson,
                    lessonStepId:
                      firstUncompletedCourse.learner_progress.last_stopped_step,
                  };
                  setCourseToContinue({ ...continueCourseData });
                  await AsyncStorage.setItem(
                    `continue-${user.id}`,
                    JSON.stringify(continueCourseData)
                  );
                }
              }
            } catch (error) {
              console.error('Failed to fetch user enrolled courses:', error);
              Toast.show('Failed to fetch continue course. Please try again.', {
                position: Toast.positions.BOTTOM,
              });
              setError(true);
              setLoading(false);
            }
          }
        } catch (error) {
          console.error('Failed to fetch continue course from storage:', error);
          Toast.show('Failed to fetch continue course. Please try again.', {
            position: Toast.positions.BOTTOM,
          });
          setError(true);
          setLoading(false);
        }
      }
      setLoading(false);
    };

    fetchContinueCourse();
  }, [accessToken, user, refresh]);

  return {
    loading,
    error,
    course: courseToContinue,
    setRefresh,
    refresh,
  };
};
