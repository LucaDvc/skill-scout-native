import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Card, Modal, Spinner, Text } from '@ui-kitten/components';

const LoadingModal = ({ visible }) => {
  return (
    <Modal visible={visible} backdropStyle={styles.backdrop}>
      <Card
        disabled={true}
        style={styles.card}
        header={<Text category='s1'>Loading</Text>}
      >
        <View style={styles.cardContent}>
          <Spinner />
          <Text style={{ marginLeft: 20 }}>Please wait...</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    minWidth: 200,
  },
});

export default LoadingModal;
