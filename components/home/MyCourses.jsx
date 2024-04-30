import React from 'react';
import {
  Button,
  Card,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
import { ArrowIosRightIcon, ArrowRightIcon, HeartIcon, PlusIcon } from '../extra/icons';
import { useSelector } from 'react-redux';
import { getCourses } from '../../features/learning/learningSlice';
import HorizontalCourseList from '../layout/HorizontalCourseList';
import HorizontalCourseListTopNav from '../layout/HorizontalCourseListTopNav';
import EnrolledCourseCard from '../course-cards/EnrolledCourseCard';
import { Platform, View } from 'react-native';
import { router } from 'expo-router';

const MyCourses = () => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const { user, accessToken } = useSelector((state) => state.users);

  const wishlistCardPress = () => {
    router.push('/wishlist');
  };

  const searchCoursesPress = () => router.push('/catalog');

  return !accessToken || user?.enrolled_courses?.length === 0 ? (
    <Layout
      style={{
        justifyContent: 'flex-start',
        padding: 24,
      }}
      level='2'
    >
      <Text category='h6' style={{ marginBottom: 18 }}>
        My courses
      </Text>
      <Text category='h6' style={styles.infoText}>
        Your courses will{'\n'}appear here
      </Text>
      <Button
        accessoryLeft={PlusIcon}
        appearance='outline'
        style={styles.searchCoursesButton}
        onPress={searchCoursesPress}
      >
        Search for courses in Catalog
      </Button>
    </Layout>
  ) : (
    <Layout level='2'>
      <HorizontalCourseList
        actionCreator={getCourses}
        courseCardComponent={EnrolledCourseCard}
        selector={(state) => state.learning}
        ListHeaderComponent={
          <HorizontalCourseListTopNav
            title='My Courses'
            route='/enrolled-courses'
            style={{ backgroundColor: theme['color-basic-200'] }}
          />
        }
        listBackgroundColor={theme['color-basic-200']}
      />
      <View style={styles.cardsContainer}>
        <Card style={styles.actionCard} onPress={wishlistCardPress}>
          <HeartIcon height={24} width={24} fill={theme['color-basic-500']} />
          <Text style={{ marginVertical: 2, fontSize: 17, fontWeight: 'bold' }}>
            Wishlist
          </Text>
          <Text category='c1' style={{ color: 'gray' }}>
            {user.wishlist.length === 0
              ? 'No courses'
              : user.wishlist.length === 1
              ? '1 course'
              : `${user.wishlist.length} courses`}
          </Text>
        </Card>
        <Card style={styles.actionCard} onPress={searchCoursesPress}>
          <PlusIcon height={24} width={24} fill={theme['color-basic-500']} />
          <Text style={{ marginVertical: 2, fontSize: 17, fontWeight: 'bold' }}>
            Add courses
          </Text>
          <Text category='c1' style={{ color: 'gray' }}>
            Go to catalog
          </Text>
        </Card>
      </View>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    color: 'color-primary-700',
  },
  searchCoursesButton: {
    marginTop: 24,
    backgroundColor: 'inherit',
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 8,
  },
  actionCard: {
    marginHorizontal: 16,
    width: 170,
    marginVertical: 16,
    borderRadius: 12,
    elevation: 4,
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

export default MyCourses;
