import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  Button,
  CheckBox,
  Divider,
  Layout,
  Radio,
  RadioGroup,
  Spinner,
  Text,
  TopNavigation,
  TopNavigationAction,
  useTheme,
} from '@ui-kitten/components';
import {
  BackIcon,
  CheckmarkIcon,
  CloseIcon,
} from '../../../components/extra/icons';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Rating from '../../../components/extra/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../features/category/categorySlice';
import Toast from 'react-native-root-toast';
import { changeFilters } from '../../../features/catalog/catalogSlice';

export default function FiltersModal() {
  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page. You may need to change the UI to account for this.
  const isPresented = router.canGoBack();

  const theme = useTheme();

  const [filters, setFilters] = useState({});
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState({});

  const { categories, isLoading, isError } = useSelector(
    (state) => state.category
  );
  const { filters: searchFilters } = useSelector((state) => state.catalog);
  const dispatch = useDispatch();

  useEffect(() => {
    setFilters(searchFilters);
    setSelectedPrice(
      searchFilters.price__lte === '0'
        ? 0
        : searchFilters.price__gte === '1'
        ? 1
        : null
    );
    setSelectedRating(
      searchFilters.average_rating__gte === '5'
        ? 0
        : searchFilters.average_rating__gte === '4'
        ? 1
        : searchFilters.average_rating__gte === '3'
        ? 2
        : null
    );
  }, [searchFilters]);

  useEffect(() => {
    const selectedFilterCategoriesSet = new Set(
      searchFilters.categories ? searchFilters.categories.split(',') : []
    );

    // Initialize all categories and subcategories based on whether they are in the selectedFilterCategoriesSet.
    const initialSelectedCategories = categories.reduce((acc, category) => {
      const isSelected = selectedFilterCategoriesSet.has(category.name);
      if (isSelected) {
        acc[category.name] = isSelected;
        // If the category is selected, select all subcategories as well
        category.subcategories.forEach((subcategory) => {
          acc[subcategory.name] = isSelected;
        });
      } else {
        // Initialize subcategories
        category.subcategories.forEach((subcategory) => {
          acc[subcategory.name] = selectedFilterCategoriesSet.has(
            subcategory.name
          );
        });
      }

      return acc;
    }, {});

    setSelectedCategories(initialSelectedCategories);
  }, [searchFilters.categories, categories]);

  useEffect(() => {
    if (!isLoading && isError) {
      Toast.show('Failed to retrieve categories', {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: theme['color-danger-500'],
        textColor: theme['color-basic-100'],
      });
    }
  }, [isLoading, isError]);

  const resetSelectedCategories = () => {
    setSelectedCategories(() => {
      const selected = {};
      categories.forEach((category) => {
        selected[category.name] = false;
        category.subcategories.forEach((subcategory) => {
          selected[subcategory.name] = false;
        });
      });
      return selected;
    });
  };

  useEffect(() => {
    if (categories.length === 0) dispatch(getCategories());
  }, [categories, dispatch]);

  const handlePriceFilterChnage = (index) => {
    setSelectedPrice(index);
    setFilters((prev) => {
      switch (index) {
        case 0:
          return { ...prev, price__lte: '0', price__gte: undefined };
        case 1:
          return { ...prev, price__gte: '1', price__lte: undefined };
      }
    });
  };

  const handleRatingFilterChange = (index) => {
    setSelectedRating(index);
    setFilters((prev) => {
      switch (index) {
        case 0:
          return { ...prev, average_rating__gte: '5' };
        case 1:
          return { ...prev, average_rating__gte: '4' };
        case 2:
          return { ...prev, average_rating__gte: '3' };
      }
    });
  };

  const findSupercategoryName = (subcategoryName) => {
    const category = categories.find((c) =>
      c.subcategories.some((sub) => sub.name === subcategoryName)
    );
    return category ? category.name : null;
  };

  const areAllSubcategoriesChecked = (
    supercategoryName,
    selectedCategories
  ) => {
    const supercategory = categories.find((c) => c.name === supercategoryName);
    return supercategory
      ? supercategory.subcategories.every((sub) => selectedCategories[sub.name])
      : false;
  };

  const findSubcategoryNames = (supercategoryName) => {
    const supercategory = categories.find((c) => c.name === supercategoryName);
    return supercategory
      ? supercategory.subcategories.map((sub) => sub.name)
      : [];
  };

  const updateFilterCategories = (selected) => {
    const selectedCategoriesArray = Object.entries(selected)
      .filter(([_, value]) => value) // Filter out unselected categories
      .map(([key, _]) => key); // Retrieve the category names
    const categoriesString = selectedCategoriesArray.join(',');
    setFilters((prevFilters) => ({
      ...prevFilters,
      categories: categoriesString,
    }));
  };

  const handleCategoriesChange = (
    checked,
    categoryName,
    isSubcategory = false
  ) => {
    if (isSubcategory) {
      const supercategoryName = findSupercategoryName(categoryName);
      setSelectedCategories((prev) => {
        const allSubcategories = findSubcategoryNames(supercategoryName);
        const newSelectedCategories = {
          ...prev,
          [categoryName]: checked,
          // If all are checked, set the supercategory to checked, otherwise follow the current checkbox
          [supercategoryName]: allSubcategories.every((sub) =>
            sub === categoryName ? checked : prev[sub]
          ),
        };
        updateFilterCategories(newSelectedCategories);
        return newSelectedCategories;
      });
    } else {
      const subcategoryNames = findSubcategoryNames(categoryName);
      setSelectedCategories((prev) => {
        const newSelectedCategories = {
          ...prev,
          [categoryName]: checked,
          ...subcategoryNames.reduce(
            (acc, name) => ({ ...acc, [name]: checked }),
            {}
          ),
        };
        updateFilterCategories(newSelectedCategories);
        return newSelectedCategories;
      });
    }
  };

  const isIndeterminate = (categoryName) => {
    const category = categories.find((c) => c.name === categoryName);
    if (!category) return false;

    const subChecked = category.subcategories.some(
      (sub) => selectedCategories[sub.name]
    );
    const allSubChecked = areAllSubcategoriesChecked(
      categoryName,
      selectedCategories
    );

    return subChecked && !allSubChecked;
  };

  const handleResetFilters = () => {
    setFilters({});
    setSelectedPrice(null);
    setSelectedRating(null);
    resetSelectedCategories();
  };

  const handleApplyFilters = () => {
    dispatch(changeFilters(filters));
    if (isPresented) router.back();
    else router.navigate('../');
  };

  return (
    <Layout level='2' style={styles.layout}>
      {/* Native modals have dark backgrounds on iOS, set the status bar to light content. */}
      <StatusBar style='dark' />
      <TopNavigation
        title={() => <Text category='h6'>Filters</Text>}
        alignment='center'
        appearance='control'
        accessoryLeft={
          !isPresented && (
            <TopNavigationAction
              icon={BackIcon}
              onPress={() => router.navigate('../')}
            />
          )
        }
      />
      <ScrollView style={styles.filtersContainer}>
        <Divider />
        {/* Price */}
        <View style={styles.filterItem}>
          <Text category='h6'>Price</Text>
          <View style={{ marginTop: 12 }}>
            <RadioGroup
              selectedIndex={selectedPrice}
              onChange={handlePriceFilterChnage}
            >
              <Radio>Free</Radio>
              <Radio>Paid</Radio>
            </RadioGroup>
          </View>
        </View>
        <Divider />

        {/* Ratings */}
        <View style={styles.filterItem}>
          <Text category='h6'>Rating</Text>
          <View style={{ marginTop: 12 }}>
            <RadioGroup
              selectedIndex={selectedRating}
              onChange={handleRatingFilterChange}
            >
              <Radio>
                <View>
                  <Rating value={5} />
                  <Text>5.0</Text>
                </View>
              </Radio>
              <Radio>
                <View>
                  <Rating value={4} />
                  <Text>4.0 & up</Text>
                </View>
              </Radio>
              <Radio>
                <View>
                  <Rating value={3} />
                  <Text>3.0 & up</Text>
                </View>
              </Radio>
            </RadioGroup>
          </View>
        </View>
        <Divider />

        {/* Categories */}
        <View style={styles.filterItem}>
          <Text category='h6'>Category</Text>
          {isLoading ? (
            <Spinner size='giant' />
          ) : (
            <View style={{ marginTop: 12 }}>
              {categories.map((category) => (
                <React.Fragment key={category.id}>
                  <CheckBox
                    checked={selectedCategories[category.name]}
                    indeterminate={isIndeterminate(category.name)}
                    onChange={(checked) =>
                      handleCategoriesChange(checked, category.name)
                    }
                    style={{ marginVertical: 4 }}
                  >
                    {category.name}
                  </CheckBox>
                  {category.subcategories.map((subcategory) => (
                    <CheckBox
                      key={subcategory.id}
                      checked={selectedCategories[subcategory.name]}
                      onChange={(checked) =>
                        handleCategoriesChange(checked, subcategory.name, true)
                      }
                      style={{ marginVertical: 4, marginLeft: 16 }}
                    >
                      {subcategory.name}
                    </CheckBox>
                  ))}
                </React.Fragment>
              ))}
            </View>
          )}
        </View>
        <Divider />
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <Button
          status='basic'
          appearance='outline'
          accessoryRight={(props) => (
            <CloseIcon style={{ ...props.style, marginHorizontal: 5 }} />
          )}
          style={styles.buttons}
          onPress={handleResetFilters}
        >
          Reset
        </Button>
        <Button
          style={styles.buttons}
          accessoryRight={(props) => (
            <CheckmarkIcon style={{ ...props.style, marginHorizontal: 5 }} />
          )}
          onPress={handleApplyFilters}
        >
          Apply
        </Button>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    paddingHorizontal: 24,
  },
  layout: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 36,
    marginBottom: 24,
  },
  filtersContainer: {
    marginHorizontal: 16,
  },
  filterItem: {
    marginHorizontal: 24,
    marginVertical: 12,
  },
});
