import React from 'react';
import { Button, Layout, Text, TopNavigation } from '@ui-kitten/components';
import { useSelector } from 'react-redux';
import { Image, StyleSheet, Platform, View } from 'react-native';
import { router } from 'expo-router';

const ProfileScreen = () => {
  const { user } = useSelector((state) => state.users);

  return (
    <View style={{ flex: 1 }}>
      <TopNavigation
        alignment='center'
        title={() => <Text category='h6'>Profile</Text>}
        style={styles.topBar}
      />
      <Layout style={styles.container}>
        {user ? (
          <Text>Welcome {user.first_name}</Text>
        ) : (
          <>
            <Image
              source={require('../../../../assets/mascot.png')}
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
        )}
      </Layout>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBar: {
    zIndex: 1,
    elevation: 3,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
      },
    }),
  },
});

export default ProfileScreen;
