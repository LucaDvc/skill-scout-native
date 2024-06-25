import React from 'react';
import {
  Avatar,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  useTheme,
} from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Platform, View, ScrollView, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import { EditIcon, LogoutIcon, SettingsIcon } from '../../../components/extra/icons';
import UnsignedUserProfile from '../../../components/profile/UnsignedUserProfile';
import UnconfirmedUserProfile from '../../../components/profile/UnconfirmedUserProfile';
import SignedInUserProfile from '../../../components/profile/SignedInUserProfile';
import awsConstants from '../../../constants/awsConstants';
import { getCourses } from '../../../features/learning/learningSlice';
import { getActiveCourses } from '../../../features/teaching/teachingSlice';
import SignOutModal from '../../../components/profile/settings/SignOutModal';

const UserHeader = ({ user }) => {
  const [logoutVisible, setLogoutVisible] = React.useState(false);

  return (
    <View style={{ flexDirection: 'column', flex: 1 }}>
      <SignOutModal visible={logoutVisible} setVisible={setLogoutVisible} />
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
          onPress={() => router.push('/profile/edit')}
        />
        <TopNavigationAction
          icon={<LogoutIcon />}
          onPress={() => setLogoutVisible(true)}
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
            uri: user.picture ? user.picture : awsConstants.DEFAULT_USER_PICTURE_URL,
          }}
          size='giant'
          style={{ marginRight: 32, height: 70, width: 70 }}
        />
        <Text category='h5'>{user.first_name + ' ' + user.last_name}</Text>
      </View>
    </View>
  );
};

const ProfileScreen = () => {
  const theme = useTheme();

  const dispatch = useDispatch();

  const { user, accessToken } = useSelector((state) => state.users);

  const onRefresh = React.useCallback(() => {
    if (accessToken) {
      dispatch(getCourses());
      dispatch(getActiveCourses());
    }
  }, [dispatch, getActiveCourses, getCourses, accessToken]);

  return (
    <View style={{ flex: 1, backgroundColor: theme['color-basic-100'] }}>
      <TopNavigation
        alignment={user ? 'start' : 'center'}
        title={() =>
          user ? <UserHeader user={user} /> : <Text category='h6'>Profile</Text>
        }
        style={styles.topBar}
      />
      {user && accessToken ? (
        <ScrollView
          style={{ flex: 1, backgroundColor: theme['color-basic-100'] }}
          refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}
        >
          <SignedInUserProfile />
        </ScrollView>
      ) : (
        <Layout style={styles.container}>
          {user && !accessToken ? (
            <UnconfirmedUserProfile firstName={user.first_name} />
          ) : (
            <UnsignedUserProfile />
          )}
        </Layout>
      )}
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
