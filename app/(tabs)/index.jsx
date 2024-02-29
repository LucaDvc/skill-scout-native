import React from 'react';
import {
  Button,
  Card,
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  useTheme,
} from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { router } from 'expo-router';

const PlusIcon = (props) => <Icon {...props} name='plus-outline' />;

export default function HomeScreen() {
  const theme = useTheme();
  return (
    <Layout level='4'>
      <TopNavigation
        alignment='center'
        title={() => <Text category='h6'>Home</Text>}
        style={{
          marginTop: 36,
        }}
      />

      {/* Discover courses */}
      <Layout style={[styles.container, { margin: 16 }]} level='4'>
        <Card
          style={{ padding: 12, borderRadius: 12 }}
          onPress={() => router.push('/catalog')}
        >
          <Text>
            <Text style={{ fontWeight: 'bold' }}>Discover</Text> free online
            courses. Tap to find
          </Text>
        </Card>
      </Layout>

      {/* My courses */}
      <Divider />
      <Layout
        style={{
          justifyContent: 'flex-start',
          padding: 24,
        }}
        level='2'
      >
        <Text category='h6' style={{ marginBottom: 24 }}>
          My courses
        </Text>
        <Text category='h5' style={{ color: theme['color-primary-200'] }}>
          Your courses will
        </Text>
        <Text category='h5' style={{ color: theme['color-primary-200'] }}>
          appear here
        </Text>
        <Button
          accessoryLeft={PlusIcon}
          appearance='outline'
          style={{ marginTop: 24 }}
          onPress={() => router.push('/catalog')}
        >
          Search for courses in Catalog
        </Button>
      </Layout>
      <Divider />

      {/* Recently viewed */}

      {/* Popular */}
      
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
