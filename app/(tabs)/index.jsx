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
import { ScrollView, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import PopularCoursesList from '../../components/catalog/PopularCoursesList';

const PlusIcon = (props) => <Icon {...props} name='plus-outline' />;

export default function HomeScreen() {
  const theme = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <TopNavigation
        alignment='center'
        title={() => <Text category='h6'>Home</Text>}
        style={styles.topNavigation}
      />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <Layout level='1'>
          {/* Discover courses */}
          <Card
            style={{ padding: 12, borderRadius: 12, margin: 16 }}
            onPress={() => router.push('/catalog')}
          >
            <Text>
              <Text style={{ fontWeight: 'bold' }}>Discover</Text> free online
              courses. Tap to find
            </Text>
          </Card>

          {/* My courses */}
          <Divider />
          <Layout
            style={{
              justifyContent: 'flex-start',
              padding: 24,
            }}
            level='2'
          >
            <Text category='h6' style={{ marginBottom: 18 }}>
              My courses
            </Text>
            <Text category='h6' style={{ color: theme['color-primary-700'] }}>
              Your courses will{'\n'}appear here
            </Text>
            <Button
              accessoryLeft={PlusIcon}
              appearance='outline'
              style={{
                marginTop: 24,
                backgroundColor: 'inherit',
              }}
              onPress={() => router.push('/catalog')}
            >
              Search for courses in Catalog
            </Button>
          </Layout>
          <Divider />

          {/* Popular */}
          <PopularCoursesList />
        </Layout>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  topNavigation: {
    marginTop: 36,
    zIndex: 1,
    elevation: 3,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
