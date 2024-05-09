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
import { BackIcon } from '../../components/extra/icons';
import { getWishlist } from '../../features/catalog/catalogSlice';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../../components/layout/Error';
import { ScrollView } from 'react-native-gesture-handler';
import SearchResultCourseCard from '../../components/course-cards/SearchResultCourseCard';

const WishlistScreen = () => {
  const theme = useTheme();

  const dispatch = useDispatch();
  const { courses, isLoading, isError } = useSelector((state) => state.catalog.wishlist);

  React.useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(getWishlist());
  };

  if (isError) {
    return <Error stateName='catalog' refreshCallback={handleRefresh} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <TopNavigation
        title={() => <Text category='h6'>Wishlist</Text>}
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
              <RefreshControl refreshing={false} onRefresh={handleRefresh} />
            }
            data={courses}
            renderItem={({ item: course }) => <SearchResultCourseCard course={course} />}
            style={{ backgroundColor: theme['color-basic-100'], marginTop: 8 }}
          />
        ) : (
          <ScrollView
            contentContainerStyle={styles.container}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
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

export default WishlistScreen;
