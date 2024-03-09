import React from 'react';
import {
  Avatar,
  Button,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { useSelector } from 'react-redux';
import { Image, StyleSheet, Platform, View } from 'react-native';
import { router } from 'expo-router';
import { EditIcon, SettingsIcon } from '../../../../components/extra/icons';
import UnsignedUserProfile from '../../../../components/profile/UnsignedUserProfile';
import UnconfirmedUserProfile from '../../../../components/profile/UnconfirmedUserProfile';

const UserHeader = ({ user }) => (
  <View style={{ flexDirection: 'column', flex: 1 }}>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginTop: 10,
      }}
    >
      <TopNavigationAction
        icon={<EditIcon />}
        onPress={() => router.push('/(users)/profile/edit')}
      />
      <TopNavigationAction
        icon={<SettingsIcon />}
        onPress={() => router.push('/(users)/profile/settings')}
      />
    </View>
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 16,
      }}
    >
      <Avatar
        source={{
          uri: user.picture
            ? user.picture
            : 'https://courses-platform-bucket.s3.eu-north-1.amazonaws.com/profiles/images/user-default.png',
        }}
        size='giant'
        style={{ marginRight: 32, height: 70, width: 70 }}
      />
      <Text category='h5'>{user.first_name + ' ' + user.last_name}</Text>
    </View>
  </View>
);

const ProfileScreen = () => {
  const { user, accessToken } = useSelector((state) => state.users);

  return (
    <View style={{ flex: 1 }}>
      <TopNavigation
        alignment={user ? 'start' : 'center'}
        title={() =>
          user ? <UserHeader user={user} /> : <Text category='h6'>Profile</Text>
        }
        style={styles.topBar}
      />
      <Layout style={styles.container}>
        {user ? (
          accessToken ? (
            <Text>Welcome {user.first_name}</Text>
          ) : (
            <UnconfirmedUserProfile firstName={user.first_name} />
          )
        ) : (
          <UnsignedUserProfile />
        )}
      </Layout>
    </View>
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

export default ProfileScreen;
