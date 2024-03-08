import React from 'react';
import {
  Layout,
  List,
  ListItem,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { StyleSheet, Platform } from 'react-native';
import { router } from 'expo-router';
import SignOutModal from '../../../components/profile/settings/SignOutModal';
import { BackIcon } from '../../../components/extra/icons';

const Settings = () => {
  const [logoutVisible, setLogoutVisible] = React.useState(false);

  const data = [
    { title: 'About', status: 'basic', onPress: () => router.push('/about') },
    {
      title: 'Sign out',
      status: 'danger',
      onPress: () => setLogoutVisible(true),
    },
    {
      title: 'Delete account',
      status: 'danger',
      onPress: () => setLogoutVisible(true),
    },
  ];

  const renderItem = ({ item }) => (
    <ListItem
      onPress={item.onPress}
      title={() => <Text status={item.status}>{item.title}</Text>}
    />
  );

  return (
    <Layout>
      <TopNavigation
        alignment={'center'}
        title={() => <Text category='h6'>Settings</Text>}
        accessoryLeft={
          <TopNavigationAction
            icon={<BackIcon />}
            onPress={() => router.back()}
          />
        }
        style={styles.topBar}
      />
      <List data={data} renderItem={renderItem} />
      <SignOutModal visible={logoutVisible} setVisible={setLogoutVisible} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBar: {
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
});

export default Settings;
