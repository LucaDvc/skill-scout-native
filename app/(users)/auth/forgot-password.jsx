import React from 'react';
import { ImageBackground, View } from 'react-native';
import {
  Button,
  Input,
  Layout,
  StyleService,
  useStyleSheet,
  Text,
  Icon,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { BackIcon, LockIcon } from '../../../components/extra/icons';
import { router } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  reset,
  sendForgotPasswordEmail,
} from '../../../features/users/usersSlice';
import LoadingModal from '../../../components/layout/LoadingModal';
import { MailForwardAvatar } from '../../../components/extra/MailForwardAvatar';
import Toast from 'react-native-root-toast';

export default ForgotPassword = () => {
  const [email, setEmail] = React.useState();

  const styles = useStyleSheet(themedStyles);

  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.users
  );

  React.useEffect(() => {
    if (isSuccess) {
      Toast.show(message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        onHidden: () => {
          dispatch(reset());
        },
      });
    }

    return () => {
      dispatch(reset());
    };
  }, [isSuccess]);

  const onSubmit = () => {
    if (email) {
      dispatch(reset());
      dispatch(sendForgotPasswordEmail(email));
    }
  };

  const renderEditAvatarButton = () => (
    <Button
      style={styles.editAvatarButton}
      status='basic'
      accessoryRight={LockIcon}
    />
  );

  return (
    <>
      <ImageBackground
        blurRadius={10}
        source={require('../../../assets/logo.png')}
        style={{
          height: 210,
          width: '100%',
          marginTop: 0,
        }}
        imageStyle={{ transform: [{ scale: 1 }] }}
      >
        <TopNavigation
          style={{ backgroundColor: 'transparent' }}
          accessoryLeft={
            <TopNavigationAction
              icon={<BackIcon fill='#fff' />}
              onPress={() => router.replace('/auth')}
            />
          }
        />
        <MailForwardAvatar
          style={styles.profileAvatar}
          resizeMode='center'
          source={require('../../../assets/mail-forward.png')}
          editButton={renderEditAvatarButton}
        />
      </ImageBackground>
      <Layout style={styles.formContainer} level='1'>
        <Input
          placeholder='Email'
          textContentType='emailAddress'
          accessoryRight={(style) => <Icon {...style} name='person' />}
          value={email}
          onChangeText={setEmail}
          autoCapitalize='none'
        />

        {isError && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 16,
            }}
          >
            <Text status='danger'>{message}</Text>
          </View>
        )}
      </Layout>
      <Layout>
        <Button style={styles.signInButton} size='giant' onPress={onSubmit}>
          SEND EMAIL
        </Button>
      </Layout>
      <LoadingModal visible={isLoading} />
    </>
  );
};

const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'background-basic-color-1',
  },
  profileAvatar: {
    width: 96,
    height: 96,
    borderRadius: 58,
    alignSelf: 'center',
    backgroundColor: 'background-basic-color-1',
    tintColor: 'color-primary-default',
  },
  editAvatarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  formContainer: {
    paddingTop: 32,
    paddingHorizontal: 16,
    flex: 1,
  },
  input: {
    marginTop: 16,
  },
  termsCheckBox: {
    marginTop: 24,
  },
  termsCheckBoxText: {
    color: 'text-hint-color',
    marginLeft: 10,
  },
  signUpButton: {
    marginHorizontal: 16,
  },
  signInButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
});
