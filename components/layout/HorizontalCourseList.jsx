import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, List, Spinner, Text } from '@ui-kitten/components';
import { RefreshIcon } from '../extra/icons';

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

const HorizontalCourseList = ({
  actionCreator,
  courseCardComponent: CourseCardComponent,
  selector,
  ListHeaderComponent,
  listBackgroundColor,
  NoResultsComponent,
  viewMoreLink,
}) => {
  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        horizontalList: {
          marginVertical: 0,
          paddingHorizontal: 8,
          height: '100%',
          backgroundColor: listBackgroundColor || 'transparent',
          overflow: 'hidden',
        },
        innerView: {
          justifyContent: 'center',
          alignItems: 'center',
          height: 350,
        },
      }),
    [listBackgroundColor]
  );

  const [pairedCourses, setPairedCourses] = React.useState([]);

  const dispatch = useDispatch();
  const { courses, isLoading, isError } = useSelector(selector);

  React.useEffect(() => {
    dispatch(actionCreator());
  }, [dispatch, actionCreator]);

  React.useEffect(() => {
    if (!isLoading && courses) {
      setPairedCourses(pairUpCourses(courses));
    }
  }, [courses, isLoading]);

  const renderCourseItem = React.useCallback(
    ({ item }) => (
      <View style={{ flexDirection: 'column' }}>
        <CourseCardComponent course={item.course1} />
        <CourseCardComponent
          course={item.course2}
          viewMoreLink={viewMoreLink}
        />
      </View>
    ),
    [CourseCardComponent]
  );

  return (
    <View style={{ height: 370 }}>
      {ListHeaderComponent}
      {isLoading ? (
        <View style={styles.innerView}>
          <Spinner size='giant' />
        </View>
      ) : isError ? (
        <View style={styles.innerView}>
          <Text status='danger'>
            {'An error occurred while fetching the courses.'}
          </Text>
          <Button
            appearance='ghost'
            status='basic'
            accessoryLeft={RefreshIcon}
            onPress={() => dispatch(actionCreator())}
          />
        </View>
      ) : courses.length === 0 ? (
        <View style={styles.innerView}>
          {NoResultsComponent || (
            <Text category='h6'>{'No courses found.'}</Text>
          )}
        </View>
      ) : (
        <List
          contentContainerStyle={[
            styles.horizontalList,
            pairedCourses.length <= 1 && { flex: 1 },
          ]}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={pairedCourses}
          renderItem={renderCourseItem}
          bounces={false}
        />
      )}
    </View>
  );
};

export default HorizontalCourseList;
