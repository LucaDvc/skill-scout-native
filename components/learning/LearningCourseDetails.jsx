import { ImageBackground, View, StyleSheet, BackHandler } from 'react-native';
import React from 'react';
import {
  Button,
  Divider,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { router } from 'expo-router';
import { BackIcon } from '../extra/icons';
import CourseDetailsTabBar from '../course-details/CourseDetailsTabBar';
import MaterialTopTabs from '../layout/MaterialTopTabs';

const LearningCourseDetails = ({ course }) => {
  const backgroundImageHeight = 190;

  React.useEffect(() => {
    const backAction = () => {
      if (router.canGoBack()) {
        router.back();
      } else {
        BackHandler.exitApp();
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  const handleContinueCourse = () => {
    const lastStoppedLessonId =
      course.learner_progress.last_stopped_lesson ?? course.chapters[0].lessons[0].id;
    const lastStoppedStepId =
      course.learner_progress.last_stopped_step ??
      course.chapters[0].lessons[0].lesson_steps[0].id;
    router.replace(
      `/learning/${course.id}/lessons/${lastStoppedLessonId}?lessonStepId=${lastStoppedStepId}`
    );
  };

  return (
    <>
      <TopNavigation
        alignment='center'
        title={() => <Text category='h6'>{course.title}</Text>}
        appearance='control'
        accessoryLeft={
          <TopNavigationAction icon={BackIcon} onPress={() => router.back()} />
        }
        style={styles.topNavigation}
      />

      <ImageBackground
        blurRadius={10}
        source={{ uri: course.image }}
        style={{
          height: backgroundImageHeight,
          width: '100%',
          marginTop: 0,
        }}
        imageStyle={{ transform: [{ scale: 1.2 }] }}
      >
        {/* Content that goes on top of the blurred image */}
        <View
          style={{
            alignItems: 'center',
            height: backgroundImageHeight,
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
          }}
        >
          <Button
            size='medium'
            style={{
              borderRadius: 32,
              paddingHorizontal: 42,
              marginTop: 70,
            }}
            onPress={handleContinueCourse}
          >
            Continue Learning
          </Button>
          <Divider
            style={{
              marginVertical: 16,
              width: '100%',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              paddingHorizontal: 24,
            }}
          >
            <Text>Current porgress</Text>
            <Text>{`${course.learner_progress.completed_lessons.length} / ${course.lessons_count}`}</Text>
          </View>
        </View>
      </ImageBackground>
      <MaterialTopTabs tabBar={(props) => <CourseDetailsTabBar {...props} />}>
        <MaterialTopTabs.Screen
          name='info'
          options={{
            headerShown: false,
          }}
        />
        <MaterialTopTabs.Screen
          name='reviews'
          options={{
            headerShown: false,
          }}
        />
        <MaterialTopTabs.Screen
          name='modules'
          options={{
            headerShown: false,
          }}
        />
      </MaterialTopTabs>
    </>
  );
};

const styles = StyleSheet.create({
  topNavigation: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 100,
  },
});

export default LearningCourseDetails;
