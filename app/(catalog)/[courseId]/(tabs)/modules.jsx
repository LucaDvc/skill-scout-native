import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import {
  Divider,
  Layout,
  List,
  ListItem,
  Text,
  useTheme,
} from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import { useLocalSearchParams } from 'expo-router';
import { getCourseById } from '../../../../features/catalog/catalogSlice';

const renderItem = ({ item, index }) => <ListItem title={`${item.title}`} />;

const Modules = () => {
  const { courseId } = useLocalSearchParams();
  const theme = useTheme();

  const dispatch = useDispatch();
  const { course, isLoading } = useSelector((state) => state.catalog);

  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    setRefreshing(isLoading);
  }, [isLoading]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getCourseById(courseId));
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{ backgroundColor: theme['color-basic-100'] }}
    >
      <Layout level='1'>
        {course.chapters.map((chapter, chapterIndex) => (
          <View key={chapterIndex}>
            <Layout level='2' style={styles.chapterTitleContainer}>
              <Text category='h6'>
                {chapterIndex + 1}. {chapter.title}
              </Text>
              <Text category='c1' style={styles.chapterNoOfLessons}>
                {chapter.lessons.length}{' '}
                {chapter.lessons.length > 1 ? 'lessons' : 'lesson'}
              </Text>
            </Layout>

            {chapter.lessons.map((lesson, lessonIndex) => (
              <View key={`${chapterIndex}.${lessonIndex}`}>
                <Text
                  category='p1'
                  style={{ marginLeft: 32, marginVertical: 16 }}
                >{`${chapterIndex + 1}.${lesson.order} ${lesson.title}`}</Text>
                <Divider />
              </View>
            ))}
          </View>
        ))}
      </Layout>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  chapterTitleContainer: {
    padding: 16,
  },
  chapterNoOfLessons: {
    marginLeft: 24,
    marginTop: 4,
  },
  lessonList: {
    margin: 32,
  },
});

export default Modules;
