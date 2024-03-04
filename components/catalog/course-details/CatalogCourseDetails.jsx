import { ImageBackground, View, StyleSheet } from 'react-native';
import React from 'react';
import {
  Divider,
  Icon,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { router, withLayoutContext } from 'expo-router';
import { BlurView } from 'expo-blur';
import CatalogTabBar from '../CatalogTabBar';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const BackIcon = (props) => <Icon {...props} name='arrow-back' />;

const { Navigator } = createMaterialTopTabNavigator();

const MaterialTopTabs = withLayoutContext(Navigator);

const CatalogCourseDetails = ({ course }) => {
  const backgroundImageHeight = 190;

  return (
    <>
      <TopNavigation
        alignment='center'
        title={() => <Text category='h6'>{course.title}</Text>}
        appearance='control'
        accessoryLeft={
          <TopNavigationAction icon={BackIcon} onPress={() => router.back()} />
        }
        style={styles.topNavigation}
      />
      <Divider />

      <ImageBackground
        source={{ uri: course.image }}
        style={{
          height: backgroundImageHeight,
          width: '100%',
          marginTop: 0,
        }}
        imageStyle={{ transform: [{ scale: 1.2 }] }}
      >
        <BlurView
          experimentalBlurMethod='dimezisBlurView'
          style={{
            position: 'absolute',
            top: -20,
            bottom: 0,
            left: 0,
            right: 0,
          }}
          intensity={20}
        />
        {/* Content that goes on top of the blurred image */}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: backgroundImageHeight,
          }}
        >
          <Text>Content goes here</Text>
        </View>
      </ImageBackground>
      <MaterialTopTabs tabBar={(props) => <CatalogTabBar {...props} />}>
        <MaterialTopTabs.Screen
          name='index'
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
