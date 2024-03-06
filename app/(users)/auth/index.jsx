import { View, TouchableWithoutFeedback, ImageBackground } from 'react-native';
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

const Login = () => {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const styles = useStyleSheet(themedStyles);

  const onSignUpButtonPress = () => {
    router.replace('/auth/register');
  };

  const onForgotPasswordButtonPress = () => {
    router.push('/forgot-password');
  };

  const onPasswordIconPress = () => {
    setPasswordVisible(!passwordVisible);
  };

  const renderPasswordIcon = (props) => (
    <TouchableWithoutFeedback onPress={onPasswordIconPress}>
      <Icon {...props} name={passwordVisible ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
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
            onPress={onForgotPasswordButtonPress}
          >
            Forgot your password?
          </Button>
        </View>
      </Layout>
      <Layout>
        <Button style={styles.signInButton} size='giant'>
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
    justifyContent: 'flex-end',
  },
  passwordInput: {
    marginTop: 16,
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
});

export default Login;
