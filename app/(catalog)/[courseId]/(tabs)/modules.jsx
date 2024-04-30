import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import { Divider, Layout, Text, useTheme } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseById } from '../../../../features/catalog/catalogSlice';

const Modules = () => {
  const theme = useTheme();

  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.catalog);

  const onRefresh = React.useCallback(() => {
    dispatch(getCourseById(course.id));
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}
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
                <Text category='p1' style={{ marginLeft: 32, marginVertical: 16 }}>{`${
                  chapterIndex + 1
                }.${lesson.order} ${lesson.title}`}</Text>
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
