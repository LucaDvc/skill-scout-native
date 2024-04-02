import { View } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../features/category/categorySlice';
import {
  Card,
  Layout,
  Spinner,
  TopNavigation,
  Text,
  useTheme,
} from '@ui-kitten/components';
import { router } from 'expo-router';

const cardColors = [
  'color-info-100',
  'color-primary-100',
  'color-danger-100',
  'color-warning-100',
  'color-success-100',
];

const cardTextColors = [
  'color-info-400',
  'color-primary-600',
  'color-danger-400',
  'color-warning-500',
  'color-success-400',
];

const TopCategoriesGrid = () => {
  const theme = useTheme();
  const { categories, topCategories, isLoading } = useSelector(
    (state) => state.category
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!categories || categories.length === 0) dispatch(getCategories());
  }, [dispatch, getCategories, categories]);

  return (
    <View>
      <TopNavigation
        title={() => (
          <View>
            <Text category='h6'>Top Categories</Text>
            {!isLoading && (
              <Text category='p2'>{topCategories.length} categories</Text>
            )}
          </View>
        )}
        style={{
          height: 36,
          paddingHorizontal: 24,
          marginTop: 4,
        }}
      />

      <Layout
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          alignItems: 'center',
          marginBottom: 16,
          height: isLoading ? 98 : 'auto',
        }}
      >
        {isLoading ? (
          <View
            style={{
              height: 98,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Spinner size='giant' />
          </View>
        ) : (
          topCategories.map((category, index) => (
            <Card
              key={index}
              style={{
                width: '45%',
                height: 98,
                marginVertical: 8,
                backgroundColor: theme[cardColors[index % cardColors.length]],
                borderWidth: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() =>
                router.push({
                  pathname: '/search',
                  params: {
                    search: category.name,
                    filters: JSON.stringify({ categories: category.name }),
                  },
                })
              }
            >
              <Text
                category='s1'
                style={{
                  color: theme[cardTextColors[index % cardTextColors.length]],
                  fontWeight: 'bold',
                }}
              >
                {category.name}
              </Text>
            </Card>
          ))
        )}
      </Layout>
    </View>
  );
};

export default TopCategoriesGrid;
