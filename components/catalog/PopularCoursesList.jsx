import {
  Divider,
  Icon,
  List,
  Spinner,
  Text,
  TopNavigation,
  TopNavigationAction,
  useTheme,
} from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import BasicCourseCard from '../course-cards/BasicCourseCard';
import { useDispatch, useSelector } from 'react-redux';
import { getPopularCourses } from '../../features/catalog/catalogSlice';
import { router } from 'expo-router';

const renderHorizontalCourseItem = ({ item }) => (
  <View style={{ flexDirection: 'column' }}>
    <BasicCourseCard course={item.course1} />
    <BasicCourseCard course={item.course2} />
  </View>
);

const pairUpCourses = (courses) => {
  const pairedCourses = [];
  for (let i = 0; i < courses.length; i += 2) {
    pairedCourses.push({
      course1: courses[i],
      course2: courses[i + 1] ? courses[i + 1] : null,
    });
  }
  return pairedCourses;
};

const ForwardIcon = (props) => <Icon {...props} name='arrow-forward' />;

const PopularCoursesList = () => {
  const theme = useTheme();
  const [pairedCourses, setPairedCourses] = React.useState([]);

  const dispatch = useDispatch();
  const { popularCourses, isError, isSuccess, isLoading, message } =
    useSelector((state) => state.catalog.recommendedCourses);

  React.useEffect(() => {
    dispatch(getPopularCourses());
  }, [dispatch]);

  React.useEffect(() => {
    if (popularCourses && popularCourses.length > 0) {
      setPairedCourses(pairUpCourses(popularCourses));
    }
  }, [popularCourses]);

  return (
    <View style={{ height: 370 }}>
      <Divider />
      <TopNavigation
        title={() => <Text category='h6'>Popular Courses</Text>}
        style={{
          height: 36,
          paddingHorizontal: 24,
        }}
        accessoryRight={
          <TopNavigationAction
            icon={ForwardIcon}
            onPress={() => {
              router.push('/catalog');
            }}
          />
        }
      />
      {isLoading ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 350,
          }}
        >
          <Spinner size='giant' />
        </View>
      ) : (
        <List
          contentContainerStyle={styles.horizontalList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={pairedCourses}
          renderItem={renderHorizontalCourseItem}
          bounces={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalList: {
    marginVertical: 0,
    paddingHorizontal: 8,
    height: '100%',
    backgroundColor: '#FFF',
    overflow: 'hidden',
  },
});

export default PopularCoursesList;
