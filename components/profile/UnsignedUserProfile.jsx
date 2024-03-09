import { Image } from 'react-native';
import React from 'react';
import { Button, Text } from '@ui-kitten/components';
import { router } from 'expo-router';

const UnsignedUserProfile = () => {
  return (
    <>
      <Image
        source={require('../../assets/mascot.png')}
        style={{ height: 180, width: 180, marginRight: 7 }}
      />
      <Text style={{ marginTop: 10 }}>Sign in to continue</Text>
      <Button
        appearance='outline'
        style={{ backgroundColor: 'transparent', marginTop: 15 }}
        onPress={() => router.push('/auth')}
      >
        Sign In
      </Button>
    </>
  );
};

export default UnsignedUserProfile;
