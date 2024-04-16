import { View, StyleSheet, Platform, RefreshControl } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import {
  Layout,
  List,
  Spinner,
  Text,
  TopNavigation,
  TopNavigationAction,
  useTheme,
} from '@ui-kitten/components';
import { BackIcon } from '../../../components/extra/icons';
import {
  getCoursesByFilter,
  reset,
} from '../../../features/catalog/catalogSlice';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../../../components/layout/Error';
import { ScrollView } from 'react-native-gesture-handler';
import { renderSearchedCourse } from '../../../utils/listRenders';

const ordering = '-avg_rating';

const HighestRatedCoursesPage = () => {
  const [page, setPage] = React.useState(0);

  const theme = useTheme();

  const dispatch = useDispatch();
  const { courses, isLoading, isError, hasMore } = useSelector(
    (state) => state.catalog
  );

  const fetchData = (pageToFetch = page) => {
    const searchParams = { page: pageToFetch + 1, ordering };
    if (hasMore) {
      setPage(pageToFetch + 1);
      dispatch(getCoursesByFilter(searchParams));
    }
  };

  React.useEffect(() => {
    dispatch(reset());
    dispatch(getCoursesByFilter({ page: 1, ordering }));
  }, [dispatch]);

  const renderFooter = () => {
    if (!isLoading) return null;
    return <Spinner style={{ margin: 20 }} />;
  };

  const handleRefresh = () => {
    dispatch(reset());
    setPage(0);
    dispatch(getCoursesByFilter({ page: 1, ordering }));
  };

  if (isError) {
    return <Error stateName='catalog' refreshCallback={handleRefresh} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <TopNavigation
        title={() => <Text category='h6'>Highest Rated Courses</Text>}
        alignment='center'
        accessoryLeft={
          <TopNavigationAction
            icon={BackIcon}
            onPress={() => {
              router.back();
            }}
          />
        }
        style={styles.topNavigation}
      />
      <Layout style={styles.container}>
        {isLoading ? (
          <Spinner size='giant' />
        ) : courses.length > 0 ? (
          <List
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={handleRefresh}
              />
            }
            data={courses}
            renderItem={renderSearchedCourse}
            ListFooterComponent={renderFooter}
            onEndReached={fetchData}
            onEndReachedThreshold={0.5}
            style={{ backgroundColor: theme['color-basic-100'], marginTop: 8 }}
          />
        ) : (
          <ScrollView
            contentContainerStyle={styles.container}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={handleRefresh}
              />
            }
          >
            <Text category='h5'>No results found</Text>
          </ScrollView>
        )}
      </Layout>
    </View>
  );
};

const styles = StyleSheet.create({
  topNavigation: {
    zIndex: 1,
    elevation: 3,
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
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default HighestRatedCoursesPage;
