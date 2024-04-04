import { ImageBackground, View, StyleSheet, BackHandler } from 'react-native';
import React from 'react';
import {
  Button,
  Icon,
  Text,
  TopNavigation,
  TopNavigationAction,
  useTheme,
} from '@ui-kitten/components';
import { router, withLayoutContext } from 'expo-router';
import CatalogTabBar from './CatalogTabBar';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Rating from '../../extra/Rating';
import { HeartOutlineIcon, HeartIcon, PeopleIcon } from '../../extra/icons';
import { useDispatch, useSelector } from 'react-redux';
import { wishlistCourse } from '../../../features/catalog/catalogSlice';
import { refreshAuthUser } from '../../../features/users/usersSlice';
import Toast from 'react-native-root-toast';

const BackIcon = (props) => <Icon {...props} name='arrow-back' />;

const { Navigator } = createMaterialTopTabNavigator();

const MaterialTopTabs = withLayoutContext(Navigator);

const CatalogCourseDetails = ({ course }) => {
  const backgroundImageHeight = 190;
  const theme = useTheme();

  const { accessToken, user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const [isWishlited, setIsWishlited] = React.useState(
    user?.wishlist?.some((c) => c.id === course.id)
  );

  React.useEffect(() => {
    const backAction = () => {
      if (router.canGoBack()) {
        router.back();
      } else {
        BackHandler.exitApp();
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const handleWishlist = () => {
    if (accessToken) {
      dispatch(wishlistCourse(course.id));
      setIsWishlited(!isWishlited);
      setTimeout(() => {
        dispatch(refreshAuthUser());
        Toast.show(
          `Course ${!isWishlited ? 'added to' : 'removed from'} wishlist`,
          {
            position: Toast.positions.BOTTOM,
          }
        );
      }, 500);
    } else {
      router.push('/auth');
    }
  };

  return (
    <>
      <TopNavigation
        alignment='center'
        title={() => <Text category='h6'>{course.title}</Text>}
        appearance='control'
        accessoryLeft={
          <TopNavigationAction icon={BackIcon} onPress={() => router.back()} />
        }
        accessoryRight={
          <TopNavigationAction
            icon={
              !isWishlited
                ? HeartOutlineIcon
                : (props) => <HeartIcon fill={'#ff4a5e'} {...props} />
            }
            onPress={handleWishlist}
          />
        }
        style={styles.topNavigation}
      />

      <ImageBackground
        blurRadius={10}
        source={{ uri: course.image }}
        style={{
          height: backgroundImageHeight,
          width: '100%',
          marginTop: 0,
        }}
        imageStyle={{ transform: [{ scale: 1.2 }] }}
      >
        {/* Content that goes on top of the blurred image */}
        <View
          style={{
            alignItems: 'center',
            height: backgroundImageHeight,
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
          }}
        >
          <Button
            size='medium'
            style={{
              borderRadius: 32,
              paddingHorizontal: 42,
              marginTop: 70,
            }}
            onPress={() => router.push('/payment?courseId=' + course.id)}
          >
            Join Course
          </Button>
          <View
            style={{
              marginTop: 28,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Rating value={course.average_rating} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 16,
              }}
            >
              <PeopleIcon
                width={16}
                height={16}
                style={{ marginRight: 2 }}
                fill={theme['color-basic-700']}
              />
              <Text
                category='p2'
                style={{ marginRight: 12, color: theme['color-basic-700'] }}
              >
                {course.enrolled_learners}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      <MaterialTopTabs tabBar={(props) => <CatalogTabBar {...props} />}>
        <MaterialTopTabs.Screen
          name='info'
          options={{
            headerShown: false,
          }}
        />
        <MaterialTopTabs.Screen
          name='reviews'
          options={{
            headerShown: false,
          }}
        />
        <MaterialTopTabs.Screen
          name='modules'
          options={{
            headerShown: false,
          }}
        />
      </MaterialTopTabs>
    </>
  );
};

const styles = StyleSheet.create({
  topNavigation: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 100,
  },
});

export default CatalogCourseDetails;
