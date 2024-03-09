import { Button, Text } from '@ui-kitten/components';
import { Link, router } from 'expo-router';
import React from 'react';
import { Image } from 'react-native';

const UnconfirmedUserProfile = ({ firstName }) => {
  return (
    <>
      <Image
        source={require('../../assets/mascot-hello.png')}
        style={{ height: 180, width: 180 }}
      />
      <Text category='h6'>Welcome, {firstName}!</Text>
      <Text
        style={{
          paddingHorizontal: 36,
          marginVertical: 16,
          textAlign: 'center',
        }}
      >
        Please confirm your email address to activate your account and get
        access to all of our features.
      </Text>
      <Text style={{ marginBottom: 16 }}>
        After that you can{' '}
        <Link href={'/auth'} style={{ textDecorationLine: 'underline' }}>
          sign in
        </Link>
        .
      </Text>
      <Button
        appearance='ghost'
        status='basic'
        onPress={() => router.push('/auth/confirm-email')}
      >
        Didn't receive an email?
      </Button>
    </>
  );
};

export default UnconfirmedUserProfile;
