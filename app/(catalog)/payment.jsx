import React, { useEffect } from 'react';
import { Pressable, View } from 'react-native';
import {
  Button,
  Divider,
  Icon,
  Input,
  Layout,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import { KeyboardAvoidingView } from '../../components/layout/KeyboardAvoidingView';
import { router, useLocalSearchParams } from 'expo-router';
import { usePaymentForm } from '../../hooks/usePaymentForm';
import { useDispatch, useSelector } from 'react-redux';
import { courseEnroll, resetEnroll } from '../../features/catalog/catalogSlice';
import LoadingModal from '../../components/layout/LoadingModal';
import Error from '../../components/layout/Error';
import Toast from 'react-native-root-toast';

export default PaymentPage = () => {
  const { courseId } = useLocalSearchParams();

  const styles = useStyleSheet(themedStyles);
  const dispatch = useDispatch();
  const { isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.catalog.enroll
  );

  useEffect(() => {
    if (isSuccess) {
      router.replace(`/learning/${courseId}/(tabs)`);
      Toast.show('Enrolled successfully', {
        position: Toast.positions.CENTER,
      });
    }

    return () => {
      dispatch(resetEnroll());
    };
  }, [isSuccess]);

  const {
    fields,
    setters,
    fieldsStatus,
    validateForm,
    cvvVisible,
    onCVVIconPress,
  } = usePaymentForm();

  const onPayButtonPress = () => {
    if (validateForm()) {
      dispatch(courseEnroll(courseId));
    }
  };

  const renderCVVIcon = (props) => (
    <Pressable onPress={onCVVIconPress}>
      <Icon {...props} name={cvvVisible ? 'eye' : 'eye-off'} />
    </Pressable>
  );

  if (isError) {
    return (
      <Error
        state={'catalog'}
        message={message}
        refreshCallback={() => dispatch(courseEnroll(courseId))}
      />
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <LoadingModal visible={isLoading} />
      <Layout style={styles.form} level='1'>
        <Input
          style={styles.input}
          label='CARD NUMBER'
          placeholder='1234 3456 5677 8907'
          keyboardType='numeric'
          maxLength={16}
          value={fields.number}
          onChangeText={setters.setNumber}
          status={fieldsStatus.numberStatus}
          caption={
            fieldsStatus.numberStatus === 'danger' &&
            'Card number should have exactly 16 characters'
          }
        />
        <View style={styles.middleContainer}>
          <Input
            style={[styles.input, styles.middleInput]}
            label='EXPIRES'
            maxLength={5}
            placeholder='MM / YY'
            value={fields.date}
            onChangeText={(text) => {
              let newText = text.replace(/[^0-9/]/g, ''); // Remove any non-numeric or non-slash characters
              // Automatically insert slash after MM if it's not there and user has typed two digits
              if (newText.length === 2 && fields.date.length <= 2) {
                newText += '/';
              }
              // Remove slash if user backspaces
              if (text.length === 2 && fields.date.length === 3) {
                newText = newText.slice(0, -1);
              }
              setters.setDate(newText);
            }}
            status={fieldsStatus.dateStatus}
            caption={
              fieldsStatus.dateStatus === 'danger' &&
              'Date should be valid in the format MM / YY and be in the future'
            }
          />
          <Input
            style={[styles.input, styles.middleInput]}
            label='CVV'
            keyboardType='numeric'
            placeholder='***'
            maxLength={3}
            value={fields.cvv}
            secureTextEntry={!cvvVisible}
            accessoryRight={renderCVVIcon}
            onChangeText={setters.setCVV}
            status={fieldsStatus.cvvStatus}
            caption={
              fieldsStatus.cvvStatus === 'danger' &&
              'CVV should have exactly 3 characters'
            }
          />
        </View>
        <Input
          style={styles.input}
          label='CARDHOLDER NAME'
          placeholder='Enter Name'
          value={fields.name}
          onChangeText={setters.setName}
          status={fieldsStatus.nameStatus}
          caption={fieldsStatus.nameStatus === 'danger' && 'Name is required'}
        />
      </Layout>
      <Divider />
      <Button style={styles.addButton} size='giant' onPress={onPayButtonPress}>
        Pay
      </Button>
    </KeyboardAvoidingView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-1',
  },
  form: {
    flex: 1,
    paddingHorizontal: 4,
    paddingVertical: 24,
  },
  input: {
    marginHorizontal: 12,
    marginVertical: 8,
  },
  middleContainer: {
    flexDirection: 'row',
  },
  middleInput: {
    width: 128,
  },
  addButton: {
    marginHorizontal: 16,
    marginVertical: 24,
  },
});
