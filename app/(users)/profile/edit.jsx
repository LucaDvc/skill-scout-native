import { View, StyleSheet, Platform } from 'react-native';
import React from 'react';
import {
  Input,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  useTheme,
} from '@ui-kitten/components';
import { BackIcon, CheckmarkIcon } from '../../../components/extra/icons';
import { router } from 'expo-router/build';
import { useDispatch, useSelector } from 'react-redux';
import { reset, updateUserProfile } from '../../../features/users/usersSlice';
import Toast from 'react-native-root-toast';
import LoadingModal from '../../../components/layout/LoadingModal';

const Edit = () => {
  const theme = useTheme();

  const { user, isLoading, isSuccess, isError } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = React.useState(user.first_name);
  const [firstNameStatus, setFirstNameStatus] = React.useState('basic');
  const [lastName, setLastName] = React.useState(user.last_name);
  const [lastNameStatus, setLastNameStatus] = React.useState('basic');
  const [shortBio, setShortBio] = React.useState(user.short_bio);
  const [about, setAbout] = React.useState(user.about);

  const onSubmit = () => {
    let valid = true;
    setFirstNameStatus('basic');
    setLastNameStatus('basic');
    if (firstName === '') {
      setFirstNameStatus('danger');
      valid = false;
    }
    if (lastName === '') {
      setLastNameStatus('danger');
      valid = false;
    }

    if (valid) {
      const profile = {
        first_name: firstName,
        last_name: lastName,
        short_bio: shortBio,
        about,
      };
      dispatch(updateUserProfile(profile));
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      router.back();
      Toast.show('Profile updated successfully', {
        position: Toast.positions.BOTTOM,
      });
      dispatch(reset());
    }

    if (isError) {
      Toast.show('Failed to update profile. Please try again.', {
        position: Toast.positions.BOTTOM,
      });
    }
  }, [isSuccess, isError]);

  return (
    <>
      <LoadingModal visible={isLoading} />
      <TopNavigation
        alignment='center'
        title={() => <Text category='h6'>Edit Profile</Text>}
        accessoryLeft={
          <TopNavigationAction
            icon={BackIcon}
            onPress={() => {
              router.back();
            }}
          />
        }
        accessoryRight={
          <TopNavigationAction
            icon={(props) => (
              <CheckmarkIcon {...props} fill={theme['color-primary-600']} />
            )}
            onPress={onSubmit}
          />
        }
        style={styles.topNavigation}
      />
      <Layout style={styles.container}>
        <Input
          label='First name'
          value={firstName}
          onChangeText={setFirstName}
          status={firstNameStatus}
          caption={firstNameStatus === 'danger' && 'First name is required'}
        />
        <Input
          label='Last name'
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
          status={lastNameStatus}
          caption={lastNameStatus === 'danger' && 'Last name is required'}
        />
        <Input
          label='Short bio'
          value={shortBio}
          onChangeText={setShortBio}
          style={styles.input}
          maxLength={255}
          multiline
          caption={'University, company, job, etc...'}
        />
        <Input
          label='About'
          value={about}
          onChangeText={setAbout}
          style={styles.input}
          multiline
        />
      </Layout>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  topNavigation: {
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
  input: {
    marginTop: 16,
  },
  inputTextStyle: {
    minHeight: 64,
    textAlignVertical: 'top',
  },
});

export default Edit;
