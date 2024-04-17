import React from 'react';
import { Pressable, ImageBackground, View, ScrollView } from 'react-native';
import {
  Button,
  CheckBox,
  Input,
  Layout,
  StyleService,
  useStyleSheet,
  Text,
  Icon,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { ProfileAvatar } from '../../../components/extra/ProfileAvatar';
import {
  BackIcon,
  EmailIcon,
  PersonIcon,
  PlusIcon,
} from '../../../components/extra/icons';
import { router } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../../../features/users/usersSlice';
import LoadingModal from '../../../components/layout/LoadingModal';

export default Register = () => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const [isFormInvalid, setIsFormInvalid] = React.useState(false);
  const [formErrorMessages, setFormErrorMessages] = React.useState([]);

  const [formData, setFormData] = React.useState({
    email: '',
    password1: '',
    password2: '',
    first_name: '',
    last_name: '',
  });

  const { email, password1, password2, first_name, last_name } = formData;

  const onChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const styles = useStyleSheet(themedStyles);

  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, message, errors } = useSelector(
    (state) => state.users
  );

  const onSignUpButtonPress = () => {
    setFormErrorMessages([]);
    setIsFormInvalid(false);
    dispatch(reset());

    if (!email || !password1 || !password2 || !first_name || !last_name) {
      setIsFormInvalid(true);
      setFormErrorMessages(['All fields are required']);
      return;
    } else {
      let valid = true;

      if (!termsAccepted) {
        setIsFormInvalid(true);
        setFormErrorMessages((prevState) => [
          ...prevState,
          'You must accept the terms and conditions',
        ]);
        valid = false;
      }

      if (password1 !== password2) {
        setIsFormInvalid(true);
        setFormErrorMessages((prevState) => [
          ...prevState,
          'Passwords do not match',
        ]);
        valid = false;
      }

      if (valid) {
        dispatch(register(formData));
      }
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      router.replace('/profile');
      dispatch(reset());
    }

    return () => {
      dispatch(reset());
    };
  }, [isSuccess]);

  const onSignInButtonPress = () => {
    router.replace('/auth');
  };

  const onPasswordIconPress = () => {
    setPasswordVisible(!passwordVisible);
  };

  const renderEditAvatarButton = () => (
    <Button
      style={styles.editAvatarButton}
      status='basic'
      accessoryRight={PlusIcon}
    />
  );

  const renderPasswordIcon = (props) => (
    <Pressable onPress={onPasswordIconPress}>
      <Icon {...props} name={passwordVisible ? 'eye-off' : 'eye'} />
    </Pressable>
  );

  const renderCheckboxLabel = React.useCallback(
    (evaProps) => (
      <Text {...evaProps} style={styles.termsCheckBoxText}>
        I read and agree to Terms & Conditions
      </Text>
    ),
    []
  );

  return (
    <Layout
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
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
          <ProfileAvatar
            style={styles.profileAvatar}
            resizeMode='center'
            source={require('../../../assets/image-person.png')}
            editButton={renderEditAvatarButton}
          />
        </ImageBackground>
        <Layout style={styles.formContainer} level='1'>
          <Input
            autoCapitalize='none'
            placeholder='Email'
            accessoryRight={EmailIcon}
            value={email}
            onChangeText={(value) => onChange('email', value)}
          />
          <Input
            style={styles.input}
            placeholder='First Name'
            accessoryRight={PersonIcon}
            value={first_name}
            onChangeText={(value) => onChange('first_name', value)}
          />
          <Input
            style={styles.input}
            placeholder='Last Name'
            accessoryRight={PersonIcon}
            value={last_name}
            onChangeText={(value) => onChange('last_name', value)}
          />
          <Input
            style={styles.input}
            autoCapitalize='none'
            secureTextEntry={!passwordVisible}
            placeholder='Password'
            accessoryRight={renderPasswordIcon}
            value={password1}
            onChangeText={(value) => onChange('password1', value)}
          />
          <Input
            style={styles.input}
            autoCapitalize='none'
            secureTextEntry={!passwordVisible}
            placeholder='Confirm Password'
            accessoryRight={renderPasswordIcon}
            value={password2}
            onChangeText={(value) => onChange('password2', value)}
          />
          <CheckBox
            style={styles.termsCheckBox}
            checked={termsAccepted}
            onChange={(checked) => setTermsAccepted(checked)}
          >
            {renderCheckboxLabel}
          </CheckBox>
          {isFormInvalid &&
            formErrorMessages.map((message, index) => (
              <View
                key={index}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 16,
                }}
              >
                <Text status='danger'>{message}</Text>
              </View>
            ))}

          {message && (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 16,
              }}
            >
              <Text status={'danger'}>{message}</Text>
            </View>
          )}

          {errors &&
            Object.keys(errors).map((key) =>
              errors[key].map((errMessage, idx) => (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 16,
                  }}
                >
                  <Text status={'danger'}>{errMessage}</Text>
                </View>
              ))
            )}
        </Layout>
      </ScrollView>
      <Layout>
        <Button
          style={styles.signUpButton}
          size='giant'
          onPress={onSignUpButtonPress}
        >
          SIGN UP
        </Button>
        <Button
          style={styles.signInButton}
          appearance='ghost'
          status='basic'
          onPress={onSignInButtonPress}
        >
          Already have an account? Sign In
        </Button>
      </Layout>
      <LoadingModal visible={isLoading} />
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'background-basic-color-1',
  },
  profileAvatar: {
    width: 116,
    height: 116,
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
