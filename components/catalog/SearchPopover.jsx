import {
  BackHandler,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import Chip from '../extra/Chip';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../features/category/categorySlice';
import { ArrowIosRightIcon } from '../extra/icons';
import { router } from 'expo-router';

const topSearches = [
  'python',
  'excel',
  'javaScript',
  'react',
  'sql',
  'aws',
  'java',
  'spring boot',
  'c#',
  'digital marketing',
  'sales',
];

const SearchPopover = ({ visible, setVisible, inputRef, setSearchValue }) => {
  const windowHeight = Dimensions.get('window').height;
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  React.useEffect(() => {
    if (categories.length === 0) {
      dispatch(getCategories());
    }
  }, [categories]);

  React.useEffect(() => {
    const backAction = () => {
      console.log(visible);
      if (!visible) {
        setSearchValue('');
        if (router.canGoBack()) {
          router.back();
        } else {
          BackHandler.exitApp();
        }
      } else {
        setVisible(false); // Hide the popover
        inputRef.current.blur(); // Remove focus from the input
      }
      return true; // Return true to prevent the default back behavior
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [visible]);

  React.useEffect(() => {
    if (visible) inputRef.current.focus();
  }, [visible]);

  if (!visible) return null;

  return (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        height: windowHeight,
        top: 60,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
      }}
    >
      <Layout
        level='1'
        style={{
          height: windowHeight,
        }}
      >
        <ScrollView>
          <View style={{ margin: 8 }}>
            <Text category='h6' style={{ marginLeft: 8 }}>
              Top Searches
            </Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginVertical: 8,
              }}
            >
              {topSearches.map((search) => (
                <Chip
                  key={search}
                  label={search}
                  onPress={() => {
                    setSearchValue(search);
                    setVisible(false);
                    router.navigate({
                      pathname: '/search',
                      params: { search },
                    });
                  }}
                />
              ))}
            </View>
            <View>
              <Text category='h6' style={{ marginLeft: 8, marginTop: 8 }}>
                Browse categories
              </Text>
              <View style={{ paddingHorizontal: 8 }}>
                {categories.map((category) => {
                  return (
                    <React.Fragment key={category.id}>
                      <Pressable
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingVertical: 12,
                        }}
                        onPress={() => {
                          setVisible(false);
                          router.navigate({
                            pathname: '/search',
                            params: {
                              search: category.name,
                              filters: JSON.stringify({
                                categories: category.name,
                              }),
                            },
                          });
                        }}
                      >
                        <Text category='p1'>{category.name}</Text>
                        <ArrowIosRightIcon width={20} height={20} />
                      </Pressable>
                      {category.subcategories.map((subcategory) => (
                        <Pressable
                          key={subcategory.id}
                          style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingVertical: 12,
                          }}
                          onPress={() => {
                            setVisible(false);
                            router.navigate({
                              pathname: '/search',
                              params: {
                                search: subcategory.name,
                                filters: JSON.stringify({
                                  categories: subcategory.name,
                                }),
                              },
                            });
                          }}
                        >
                          <Text category='p1'>{subcategory.name}</Text>
                          <ArrowIosRightIcon width={20} height={20} />
                        </Pressable>
                      ))}
                    </React.Fragment>
                  );
                })}
              </View>
            </View>
          </View>
        </ScrollView>
      </Layout>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SearchPopover;
