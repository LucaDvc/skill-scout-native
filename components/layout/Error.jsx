import React, { useState, useEffect, useCallback } from 'react';
import { Image, RefreshControl, ScrollView } from 'react-native';
import {
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import { router } from 'expo-router';

const BackIcon = (props) => <Icon {...props} name='arrow-back' />;

const Error = ({
  stateName,
  action,
  errorMessage = 'Something went wrong... Please try again.',
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state[stateName]?.isLoading);

  useEffect(() => {
    setRefreshing(isLoading);
  }, [isLoading]);

  const onRefresh = useCallback(() => {
    dispatch(action());
  }, [action, dispatch]);

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <TopNavigation
        accessoryLeft={
          <TopNavigationAction icon={BackIcon} onPress={() => router.back()} />
        }
      />
      <Layout
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Image
          source={require('../../assets/errorMascot.png')}
          style={{ height: 220, width: 220, marginLeft: 20 }}
        />
        <Text category='h6'>{errorMessage}</Text>
      </Layout>
    </ScrollView>
  );
};

export default Error;
