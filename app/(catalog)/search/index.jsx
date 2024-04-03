import {
  View,
  BackHandler,
  Pressable,
  StyleSheet,
  Platform,
} from 'react-native';
import React from 'react';
import { Link, router, useLocalSearchParams, useNavigation } from 'expo-router';
import {
  Input,
  Layout,
  List,
  Spinner,
  Text,
  useTheme,
} from '@ui-kitten/components';
import { BackIcon, OptionsIcon } from '../../../components/extra/icons';
import {
  getCoursesByFilter,
  reset,
  resetFilters,
} from '../../../features/catalog/catalogSlice';
import { getCategories } from '../../../features/category/categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import SearchResultCourseCard from '../../../components/course-cards/SearchResultCourseCard';
import Error from '../../../components/layout/Error';

const renderCourseItem = ({ item }) => <SearchResultCourseCard course={item} />;

const SearchPage = () => {
  const { search } = useLocalSearchParams();
  const [searchValue, setSearchValue] = React.useState(search || '');
  const [inputValue, setInputValue] = React.useState(search || '');
  const [searchPressed, setSearchPressed] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [searchParams, setSearchParams] = React.useState({});

  const theme = useTheme();

  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { courses, isLoading, isError, message, isSuccess, hasMore, filters } =
    useSelector((state) => state.catalog);

  React.useEffect(() => {
    if (categories.length === 0) {
      dispatch(getCategories());
    }
  }, [categories]);

  const fetchData = () => {
    const searchParams = { page: 1 };
    if (searchValue) {
      searchParams.search = searchValue;
    }
    for (const filter of Object.keys(filters)) {
      const value = filters[filter];

      if (value) {
        searchParams[filter] = value;
      } else {
        delete searchParams[filter];
      }
    }

    setSearchParams(searchParams);

    dispatch(getCoursesByFilter(searchParams));
  };

  const fetchMoreData = () => {
    const searchParams = { page: page + 1 };
    if (searchValue) {
      searchParams.search = searchValue;
    }
    for (const filter of Object.keys(filters)) {
      const value = filters[filter];
      if (value) {
        searchParams[filter] = value;
      } else {
        delete searchParams[filter];
      }
    }

    setSearchParams(searchParams);

    if (hasMore) {
      setPage(page + 1);
      dispatch(getCoursesByFilter(searchParams));
    }
  };

  React.useEffect(() => {
    dispatch(reset());
    fetchData();
  }, [searchValue, filters, dispatch, searchPressed]);

  React.useEffect(() => {
    const backAction = () => {
      router.navigate('/catalog');
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
    return () => {
      backHandler.remove();
      dispatch(resetFilters());
    };
  }, []);

  const renderFooter = () => {
    if (!isLoading) return null;
    return <Spinner style={{ margin: 20 }} />;
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
          value={inputValue}
          placeholder='Search courses'
          accessoryLeft={(props) => (
            <Pressable onPress={() => router.navigate('/catalog')}>
              <BackIcon {...props} />
            </Pressable>
          )}
          accessoryRight={(props) => (
            <Link href='/search/filters'>
              <OptionsIcon {...props} />
            </Link>
          )}
          onChangeText={(nextValue) => setInputValue(nextValue)}
          style={{
            width: '95%',
            height: '75%',
            backgroundColor: theme['color-basic-100'],
          }}
          size='medium'
          returnKeyType='search'
          onSubmitEditing={() => {
            setSearchPressed(!searchPressed);
            setSearchValue(inputValue);
            setPage(1);
          }}
          clearButtonMode='while-editing'
        />
      </View>
      <Layout style={styles.container}>
        {isLoading ? (
          <Spinner size='giant' />
        ) : isError ? (
          <Error
            stateName='catalog'
            refreshCallback={() => dispatch(getCoursesByFilter(searchParams))}
          />
        ) : isSuccess && courses.length > 0 ? (
          <List
            data={courses}
            renderItem={renderCourseItem}
            ListFooterComponent={renderFooter}
            onEndReached={fetchMoreData}
            onEndReachedThreshold={0.5}
            style={{ backgroundColor: theme['color-basic-100'] }}
          />
        ) : (
          <Text category='h5'>No results found</Text>
        )}
      </Layout>
    </View>
  );
};

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
    flex: 1,
  },
});

export default SearchPage;
