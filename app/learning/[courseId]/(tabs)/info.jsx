import {
  View,
  ScrollView,
  useWindowDimensions,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import React from 'react';
import { Avatar, Card, Divider, Layout, Text } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import RenderHtml from 'react-native-render-html';
import {
  BarChart2OutlineIcon,
  ClockOutlineIcon,
  FolderOutlineIcon,
  HashIcon,
  ListOutlineIcon,
  PeopleOutlineIcon,
  PersonDoneOutlineIcon,
} from '../../../../components/extra/icons';
import { getCourseById } from '../../../../features/learning/learningSlice';

const Info = () => {
  const dispatch = useDispatch();
  const { course, isLoading } = useSelector((state) => state.learning);

  const { width } = useWindowDimensions();

  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    setRefreshing(isLoading);
  }, [isLoading]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getCourseById(course.id));
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Layout>
        <Text category='p2' style={{ marginHorizontal: 16, marginVertical: 8 }}>
          {course.intro}
        </Text>

        <Divider style={{ marginVertical: 4 }} />

        <Text category='h6' style={{ marginTop: 16, marginLeft: 16 }}>
          About
        </Text>
        <View style={{ margin: 16 }}>
          <RenderHtml
            contentWidth={width}
            source={{ html: course.description }}
          />
        </View>

        <Divider />

        <Text
          category='s1'
          style={{ marginTop: 16, marginLeft: 16, fontWeight: 'bold' }}
        >
          <ListOutlineIcon width={16} height={16} style={styles.icons} />
          Requirements
        </Text>
        <View style={{ margin: 16 }}>
          <RenderHtml
            contentWidth={width}
            source={{ html: course.requirements }}
          />
        </View>

        <View style={styles.courseMetaItemView}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <PersonDoneOutlineIcon
              width={16}
              height={16}
              style={styles.icons}
            />
            <Text category='s1' style={{ fontWeight: 'bold' }}>
              Instructor
            </Text>
          </View>

          <Card
            style={{
              borderWidth: 0,
              alignItems: 'center',
              flexDirection: 'row',
            }}
            onPress={() =>
              router.push(`(users)/profile/${course.instructor.id}`)
            }
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Avatar
                shape='rounded'
                size='large'
                source={{ uri: course.instructor.picture }}
              />
              <Text category='p1' style={{ marginLeft: 16 }}>
                {course.instructor.first_name} {course.instructor.last_name}
              </Text>
            </View>
            <View style={{ marginTop: 16 }}>
              <Text category='c1'>{course.instructor.short_bio}</Text>
            </View>
          </Card>
        </View>

        <View style={styles.courseMetaItemView}>
          <View style={styles.courseMetaItemTitle}>
            <FolderOutlineIcon width={16} height={16} style={styles.icons} />
            <Text category='s1' style={{ fontWeight: 'bold' }}>
              Category
            </Text>
          </View>
          <Text category='c1' style={styles.courseMetaItemText}>
            {course.category.name}
          </Text>
        </View>

        <View style={styles.courseMetaItemView}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <BarChart2OutlineIcon width={16} height={16} style={styles.icons} />
            <Text category='s1' style={{ fontWeight: 'bold' }}>
              Level
            </Text>
          </View>
          <Text category='c1' style={{ marginTop: 12, marginLeft: 32 }}>
            {course.level}
          </Text>
        </View>

        <View style={styles.courseMetaItemView}>
          <View style={styles.courseMetaItemTitle}>
            <ClockOutlineIcon width={16} height={16} style={styles.icons} />
            <Text category='s1' style={{ fontWeight: 'bold' }}>
              Expected time to complete
            </Text>
          </View>
          <Text category='c1' style={styles.courseMetaItemText}>
            {course.total_hours} {+course.total_hours > 1 ? 'hours' : 'hour'}
          </Text>
        </View>

        <View style={styles.courseMetaItemView}>
          <View style={styles.courseMetaItemTitle}>
            <PeopleOutlineIcon width={16} height={16} style={styles.icons} />
            <Text category='s1' style={{ fontWeight: 'bold' }}>
              Learners count
            </Text>
          </View>

          <Text category='c1' style={{ marginTop: 12, marginLeft: 32 }}>
            {course.enrolled_learners}
          </Text>
        </View>

        <View style={styles.courseMetaItemView}>
          <View style={styles.courseMetaItemTitle}>
            <HashIcon width={16} height={16} style={styles.icons} />
            <Text category='s1' style={{ fontWeight: 'bold' }}>
              Tags
            </Text>
          </View>

          <Text category='c1' style={{ marginTop: 12, marginLeft: 32 }}>
            {course.tags.map((tag) => tag.name).join(', ')}
          </Text>
        </View>
      </Layout>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  icons: {
    marginRight: 16,
  },
  courseMetaItemView: {
    margin: 16,
    justifyContent: 'center',
  },
  courseMetaItemTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseMetaItemText: {
    marginTop: 12,
    marginLeft: 32,
  },
});

export default Info;
