import React from 'react';
import { Divider, Input, Layout, Text, useTheme } from '@ui-kitten/components';
import {
  ScrollView,
  StyleSheet,
  Platform,
  Pressable,
  View,
  RefreshControl,
  Keyboard,
} from 'react-native';
import {
  BackIcon,
  OptionsIcon,
  SearchIcon,
} from '../../../../components/extra/icons';
import HighestRatedCoursesList from '../../../../components/catalog/HighestRatedCoursesList';
import { useDispatch, useSelector } from 'react-redux';
import {
  getHighestRatedCourses,
  getPopularCourses,
} from '../../../../features/catalog/catalogSlice';
import PopularCoursesList from '../../../../components/catalog/PopularCoursesList';
import TopCategoriesGrid from '../../../../components/catalog/TopCategoriesGrid';
import { getCategories } from '../../../../features/category/categorySlice';
import SearchPopover from '../../../../components/catalog/SearchPopover';
import { router } from 'expo-router';

export default function CatalogScreen() {
  const theme = useTheme();
  const [searchValue, setSearchValue] = React.useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const [searchOptionsVisible, setSearchOptionsVisible] = React.useState(false);
  const searchInputRef = React.useRef(null);

  const { isLoading: highestRatedLoading } = useSelector(
    (state) => state.catalog.highestRatedCourses
  );
  const { isLoading: popularLoading } = useSelector(
    (state) => state.catalog.popularCourses
  );
  const { isLoading: categoriesLoading } = useSelector(
    (state) => state.category
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!highestRatedLoading && !popularLoading && !categoriesLoading) {
      setRefreshing(false);
    } else {
      setRefreshing(true);
    }
  }, [highestRatedLoading, popularLoading]);

  const onRefresh = React.useCallback(() => {
    dispatch(getHighestRatedCourses());
    dispatch(getPopularCourses());
    dispatch(getCategories());
  }, [dispatch, getHighestRatedCourses, getPopularCourses]);

  const hideSearchPopover = () => {
    setSearchOptionsVisible(false);
    searchInputRef.current.blur();
    setSearchValue('');
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={[
          styles.topNavigation,
          { backgroundColor: theme['color-basic-100'] },
        ]}
      >
        <Input
          ref={searchInputRef}
          value={searchValue}
          placeholder='Search courses'
          onFocus={() => setSearchOptionsVisible(true)}
          accessoryLeft={(props) =>
            searchOptionsVisible ? (
              <Pressable onPress={hideSearchPopover}>
                <BackIcon {...props} />
              </Pressable>
            ) : (
              <SearchIcon {...props} />
            )
          }
          accessoryRight={(props) => (
            <Pressable
              onPress={() => {
                router.push('/search/filters');
                setSearchOptionsVisible(true);
              }}
            >
              <OptionsIcon {...props} />
            </Pressable>
          )}
          onChangeText={(nextValue) => setSearchValue(nextValue)}
          style={{
            width: '95%',
            height: '75%',
            backgroundColor: theme['color-basic-100'],
          }}
          size='medium'
          returnKeyType='search'
          onSubmitEditing={() => {
            router.navigate({
              pathname: '/search',
              params: { search: searchValue },
            });
          }}
          clearButtonMode='while-editing'
        />
      </View>
      <SearchPopover
        visible={searchOptionsVisible}
        setVisible={setSearchOptionsVisible}
        inputRef={searchInputRef}
        setSearchValue={setSearchValue}
      />
      <ScrollView
        style={{ flex: 1, backgroundColor: theme['color-basic-100'] }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Layout>
          <HighestRatedCoursesList />

          <Divider style={{ marginTop: 16 }} />
          <TopCategoriesGrid />

          <Divider style={{ marginTop: 16 }} />
          <PopularCoursesList />
        </Layout>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  topNavigation: {
    zIndex: 1,
    elevation: 3,
    paddingBottom: 16,
    paddingHorizontal: 4,
    paddingTop: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  },
});
