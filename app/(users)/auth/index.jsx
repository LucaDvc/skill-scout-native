import { View, ImageBackground, Pressable } from 'react-native';
import React from 'react';
import {
  Button,
  Icon,
  Input,
  Layout,
  StyleService,
  Text,
  TopNavigation,
  TopNavigationAction,
  useStyleSheet,
} from '@ui-kitten/components';
import { router } from 'expo-router';
import { BackIcon } from '../../../components/extra/icons';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../../../features/users/usersSlice';
import LoadingModal from '../../../components/layout/LoadingModal';

const Login = () => {
  const { isError, isSuccess, isLoading, message, user } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState(user?.email || '');
  const [password, setPassword] = React.useState('');
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const styles = useStyleSheet(themedStyles);

  const onSignUpButtonPress = () => {
    router.replace('/auth/register');
  };

  const onForgotPasswordButtonPress = () => {
    router.replace('/auth/forgot-password');
  };

  const onConfirmEmailButtonPress = () => {
    router.replace('/auth/confirm-email');
  };

  const onPasswordIconPress = () => {
    setPasswordVisible(!passwordVisible);
  };

  const renderPasswordIcon = (props) => (
    <Pressable onPress={onPasswordIconPress}>
      <Icon {...props} name={passwordVisible ? 'eye-off' : 'eye'} />
    </Pressable>
  );

  const onSubmit = () => {
    if (email && password) {
      dispatch(login({ email, password }));
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      router.replace('/');
      dispatch(reset());
    }

    return () => {
      dispatch(reset());
    };
  }, [isSuccess]);

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
              onPress={() => router.back()}
            />
          }
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text category='h1' style={{ color: '#000' }}>
            Hello
          </Text>
          <Text style={styles.signInLabel} category='s1'>
            Sign in to your account
          </Text>
        </View>
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
        <Input
          style={styles.passwordInput}
          placeholder='Password'
          accessoryRight={renderPasswordIcon}
          value={password}
          secureTextEntry={!passwordVisible}
          onChangeText={setPassword}
          autoCapitalize='none'
        />
        <View style={styles.forgotPasswordContainer}>
          <Button
            style={styles.forgotPasswordButton}
            appearance='ghost'
            status='basic'
            onPress={onConfirmEmailButtonPress}
          >
            Confirm email
          </Button>
          <Button
            style={styles.forgotPasswordButton}
            appearance='ghost'
            status='basic'
            onPress={onForgotPasswordButtonPress}
          >
            Forgot your password?
          </Button>
        </View>

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
          SIGN IN
        </Button>
        <Button
          style={styles.signUpButton}
          appearance='ghost'
          status='basic'
          onPress={onSignUpButtonPress}
        >
          Don't have an account? Create
        </Button>
      </Layout>
      <LoadingModal visible={isLoading} />
    </>
  );
};

const themedStyles = StyleService.create({
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  signInLabel: {
    marginTop: 16,
    color: '#000',
  },
  signInButton: {
    marginHorizontal: 16,
  },
  signUpButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  passwordInput: {
    marginTop: 16,
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
});

export default Login;
