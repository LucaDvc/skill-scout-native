import React from 'react';
import {
  Avatar,
  Button,
  Card,
  Divider,
  ProgressBar,
  Spinner,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import { useCourseToContinue } from '../../hooks/useCourseToContinue';
import { ImageBackground, Pressable, View } from 'react-native';
import { RefreshIcon } from '../extra/icons';
import { router } from 'expo-router';

const Discover = () => {
  const styles = useStyleSheet(themedStyles);
  const { loading, error, course, setRefresh } = useCourseToContinue();

  const handleContinueCourse = () => {
    router.navigate(
      `/learning/${course.id}/lessons/${course.lessonId}?lessonStepId=${course.lessonStepId}`
    );
  };

  if (loading) {
    return (
      <Card>
        <View style={styles.loadingContainer}>
          <Spinner size='large' />
        </View>
      </Card>
    );
  }

  if (error) {
    return (
      <Card style={styles.discoverCard}>
        <View>
          <Text status='danger'>Failed to load course. Please try again.</Text>
          <Button
            appearance='ghost'
            status='basic'
            accessoryLeft={RefreshIcon}
            onPress={() => setRefresh((prevState) => prevState + 1)}
          />
        </View>
      </Card>
    );
  }

  return !course ? (
    <Card style={styles.discoverCard} onPress={() => router.push('/catalog')}>
      <Text>
        <Text style={{ fontWeight: 'bold' }}>Discover</Text> free online courses. Tap to
        find
      </Text>
    </Card>
  ) : (
    <View style={styles.continueCard}>
      <ImageBackground
        blurRadius={3}
        source={require('../../assets/study-room-cropped.jpg')}
        style={styles.imageBackground}
        resizeMode='cover'
        imageStyle={{ borderRadius: 12 }}
      >
        {/* Content that goes on top of the blurred image */}
        <View style={styles.continueCardContent}>
          <Button
            size='large'
            style={styles.continueButton}
            onPress={handleContinueCourse}
          >
            Continue Learning
          </Button>
          <View style={styles.courseInfoContainer}>
            <Pressable onPress={() => router.navigate(`/learning/${course.id}/modules`)}>
              <Avatar
                shape='rounded'
                source={{ uri: course.image }}
                style={styles.courseAvatar}
              />
            </Pressable>
            <View style={{ alignItems: 'flex-start', marginLeft: 10 }}>
              <Text style={{ color: 'white', fontSize: 17 }}>{course.title}</Text>
              <Text
                style={{ color: 'white' }}
                category='c1'
              >{`Current progress: ${course.completedLessons} / ${course.totalLessons} lessons`}</Text>
            </View>
          </View>
          <ProgressBar
            progress={course.completedLessons / course.totalLessons}
            animating={false}
            size='medium'
            style={styles.progressBar}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const themedStyles = StyleService.create({
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 170,
  },
  discoverCard: {
    padding: 12,
    borderRadius: 12,
    margin: 16,
  },
  continueCard: {
    borderRadius: 12,
    margin: 16,
  },
  imageBackground: {
    width: '100%',
    height: 170,
    borderRadius: 12,
  },
  continueCardContent: {
    alignItems: 'center',
    height: 170,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    borderRadius: 12,
    overflow: 'hidden',
  },
  continueButton: {
    borderRadius: 50,
    paddingHorizontal: 50,
    marginTop: 35,
  },
  courseInfoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 24,
    marginTop: 12,
  },
  courseAvatar: { borderRadius: 8, height: 48, width: 48 },
  progressBar: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'transparent',
  },
});

export default Discover;
