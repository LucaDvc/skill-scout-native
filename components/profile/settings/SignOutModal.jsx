import { Button, Card, Modal, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../../../features/users/usersSlice';
import { router } from 'expo-router';

const SignOutModal = ({ visible, setVisible }) => {
  const dispatch = useDispatch();
  const { isSuccess } = useSelector((state) => state.users);

  React.useEffect(() => {
    if (isSuccess) {
      router.replace('/profile');
      dispatch(reset());
    }
  }, [isSuccess]);

  return (
    <Modal visible={visible} backdropStyle={styles.backdrop}>
      <Card
        style={styles.card}
        header={<Text category='s1'>Sign Out</Text>}
        onBackdropPress={() => setVisible(false)}
      >
        <Text>Are you sure you want to log out?</Text>
        <View style={styles.cardContent}>
          <Button onPress={() => setVisible(false)} status='basic'>
            No
          </Button>
          <Button onPress={() => dispatch(logout())} status='danger'>
            Yes
          </Button>
        </View>
      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  cardContent: {
    display: 'flex',
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  card: {
    minWidth: 200,
  },
});

export default SignOutModal;
