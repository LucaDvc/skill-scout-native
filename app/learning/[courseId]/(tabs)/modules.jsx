import { Pressable, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import { Divider, Layout, Text, useTheme } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseById } from '../../../../features/learning/learningSlice';
import { CheckmarkIcon, DoneAllIcon } from '../../../../components/extra/icons';
import { router } from 'expo-router';

const Modules = () => {
  const theme = useTheme();

  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.learning);

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
              <View>
                <Text category='h6'>
                  {chapterIndex + 1}. {chapter.title}
                </Text>
                <Text category='c1' style={styles.chapterNoOfLessons}>
                  {chapter.lessons.length}{' '}
                  {chapter.lessons.length > 1 ? 'lessons' : 'lesson'}
                </Text>
              </View>
              {chapter.completed && (
                <DoneAllIcon width={24} height={24} fill={theme['color-primary-500']} />
              )}
            </Layout>

            {chapter.lessons.map((lesson, lessonIndex) => (
              <Pressable
                key={`${chapterIndex}.${lessonIndex}`}
                onPress={() => router.push(`/learning/${course.id}/lessons/${lesson.id}`)}
              >
                <View style={styles.lessonInfoContainer}>
                  <Text category='p1' style={{ marginLeft: 32, marginVertical: 16 }}>{`${
                    chapterIndex + 1
                  }.${lesson.order} ${lesson.title}`}</Text>
                  {lesson.completed && (
                    <CheckmarkIcon
                      width={24}
                      height={24}
                      fill={theme['color-primary-500']}
                    />
                  )}
                </View>
                <Divider />
              </Pressable>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chapterNoOfLessons: {
    marginLeft: 24,
    marginTop: 4,
  },
  lessonList: {
    margin: 32,
  },
  lessonInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 16,
  },
});

export default Modules;
