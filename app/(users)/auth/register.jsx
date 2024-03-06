import React from 'react';
import { TouchableWithoutFeedback, ImageBackground, View } from 'react-native';
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

export default ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [termsAccepted, setTermsAccepted] = React.useState(false);

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

  const onSignUpButtonPress = () => {
    navigation && navigation.goBack();
  };

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
    <TouchableWithoutFeedback onPress={onPasswordIconPress}>
      <Icon {...props} name={passwordVisible ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
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
      <View>
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
            onChangeText={(value) => onChange('first_name', value)}
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
        </Layout>
      </View>
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
