import React from 'react';
import { Avatar, Button, Card, ProgressBar, Text } from '@ui-kitten/components';
import { StyleSheet, Platform, View } from 'react-native';
import { router } from 'expo-router';
import { ArrowRightIcon } from '../extra/icons';

const Footer = ({ course }) => (
  <Button
    appearance='ghost'
    accessoryLeft={ArrowRightIcon}
    onPress={() => router.push(`(catalog)/${course.id}/(tabs)`)}
  >
    Continue Learning
  </Button>
);

const EnrolledCourseCard = ({ course, viewMoreLink }) => {
  return course ? (
    <Card
      style={styles.card}
      onPress={() => router.push(`learning/${course.id}/(tabs)`)}
      footer={() => <Footer course={course} />}
    >
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Avatar
          shape='rounded'
          source={{ uri: course.image }}
          style={{ borderRadius: 8, height: 64, width: 64 }}
        />

        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginHorizontal: 12,
            paddingRight: 24,
            width: '80%',
          }}
        >
          <Text category='h6'>{course.title}</Text>

          <View style={{ width: '100%' }}>
            <Text category='p2'>
              {course.learner_progress.completed_lessons.length +
                ' / ' +
                course.lessons_count}
            </Text>
            <ProgressBar
              progress={
                course.learner_progress.completed_lessons.length /
                course.lessons_count
              }
              animating={false}
              size='small'
              style={{ width: '100%' }}
            />
          </View>
        </View>
      </View>
    </Card>
  ) : viewMoreLink ? (
    <Card style={styles.card} onPress={() => router.push(viewMoreLink)}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Button
          accessoryRight={ForwardIcon}
          size='large'
          style={{ borderRadius: 8 }}
          onPress={() => router.push(viewMoreLink)}
        >
          View More
        </Button>
      </View>
    </Card>
  ) : null;
};

const styles = StyleSheet.create({
  card: {
    width: 360,
    height: 140,
    margin: 8,
    borderRadius: 12,
    elevation: 3,
    // shadow properties for iOS
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
      },
    }),
  },
});

export default EnrolledCourseCard;
