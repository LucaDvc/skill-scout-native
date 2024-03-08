import React from 'react';
import {
  Avatar,
  Card,
  Icon,
  Layout,
  Text,
  useTheme,
} from '@ui-kitten/components';
import { StyleSheet, Platform } from 'react-native';
import { router } from 'expo-router';

const PeopleIcon = (props) => <Icon {...props} name='people' />;

const StarIcon = (props) => <Icon {...props} name='star' />;

const BasicCourseCard = ({ course }) => {
  const theme = useTheme();

  return course ? (
    <Card
      style={styles.card}
      onPress={() => router.push(`(catalog)/${course.id}/(tabs)`)}
    >
      <Layout style={{ display: 'flex', flexDirection: 'row' }}>
        <Avatar
          shape='rounded'
          source={{ uri: course.image }}
          style={{ borderRadius: 8, height: 64, width: 64 }}
        />

        <Layout
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            marginHorizontal: 12,
            paddingRight: 24,
          }}
        >
          <Text category='h6'>{course.title}</Text>

          <Layout
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
            {course.average_rating && (
              <>
                <StarIcon
                  width={16}
                  height={16}
                  fill={theme['color-basic-600']}
                  style={{ marginRight: 2 }}
                />
                <Text category='p2'>{course.average_rating}</Text>
              </>
            )}
          </Layout>

          <Text category='s1' numberOfLines={2} ellipsizeMode='tail'>
            {course.intro}
          </Text>
        </Layout>
      </Layout>

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
