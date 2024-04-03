import React from 'react';
import { Avatar, Button, Card, Text, useTheme } from '@ui-kitten/components';
import { StyleSheet, Platform, View } from 'react-native';
import { router } from 'expo-router';
import { ForwardIcon, PeopleIcon, StarIcon } from '../extra/icons';

const BasicCourseCard = ({ course, viewMoreLink }) => {
  const theme = useTheme();

  return course ? (
    <Card
      style={styles.card}
      onPress={() => router.push(`(catalog)/${course.id}/(tabs)`)}
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
            justifyContent: 'flex-start',
            marginHorizontal: 12,
            paddingRight: 24,
          }}
        >
          <Text category='h6'>{course.title}</Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <PeopleIcon
              width={16}
              height={16}
              fill={theme['color-basic-600']}
              style={{ marginRight: 2 }}
            />
            <Text category='p2' style={{ marginRight: 12 }}>
              {course.enrolled_learners}
            </Text>

            <StarIcon
              width={16}
              height={16}
              fill={theme['color-basic-600']}
              style={{ marginRight: 2 }}
            />
            <Text category='p2'>{course.average_rating}</Text>
          </View>

          <Text category='s1' numberOfLines={2} ellipsizeMode='tail'>
            {course.intro}
          </Text>
        </View>
      </View>

      <Text
        style={{
          color:
            course.price === '0'
              ? theme['color-primary-600']
              : theme['color-info-200'],
        }}
      >
        {course.price === '0' ? 'Free' : '$' + course.price}
      </Text>
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

export default BasicCourseCard;
