import { View, StyleSheet, Platform, Pressable, Alert } from 'react-native';
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { useUserProfile } from '../../../hooks/useUserProfile';
import {
  BackIcon,
  FacebookIcon,
  GlobeIcon,
  GoogleIcon,
  LinkedInIcon,
} from '../../../components/extra/icons';
import {
  Avatar,
  Divider,
  Layout,
  List,
  Spinner,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import awsConstants from '../../../constants/awsConstants';
import BasicCourseCard from '../../../components/course-cards/BasicCourseCard';
import { pairUpCourses } from '../../../utils/courseListUtils';
import { Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const openURL = async (url) => {
  // Check if the URL can be opened
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    // Open the URL
    await Linking.openURL(url);
  } else {
    Alert.alert('Error', `Unable to open URL: ${url}`);
  }
};

const UserHeader = ({ user }) => {
  return (
    <View style={{ flexDirection: 'column', flex: 1 }}>
      <View>
        <TopNavigationAction icon={<BackIcon />} onPress={() => router.back()} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          padding: 16,
        }}
      >
        <Avatar
          source={{
            uri: user.picture ? user.picture : awsConstants.DEFAULT_USER_PICTURE_URL,
          }}
          size='giant'
          style={{ marginRight: 32, height: 70, width: 70 }}
        />
        <View>
          <Text category='h5'>{user.first_name + ' ' + user.last_name}</Text>
          <Text category='s1' style={{ marginTop: 8, maxWidth: '90%' }}>
            {user.short_bio}
          </Text>
        </View>
      </View>
    </View>
  );
};

const CourseHorizontalList = ({ courses }) => {
  const pairedCourses = pairUpCourses(courses, false);
  const renderCourseItem = React.useCallback(
    ({ item }) => (
      <View>
        <BasicCourseCard course={item.course1} />
        <BasicCourseCard course={item.course2} />
      </View>
    ),
    [courses]
  );

  return (
    <View style={{ height: 370 }}>
      <TopNavigation
        title={() => <Text category='h6'>Courses</Text>}
        style={[
          {
            paddingHorizontal: 24,
          },
        ]}
      />
      <List
        contentContainerStyle={[
          styles.horizontalList,
          pairedCourses.length <= 1 && { flex: 1 },
        ]}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={pairedCourses}
        renderItem={renderCourseItem}
        bounces={false}
      />
    </View>
  );
};

const ViewProfileScreen = () => {
  const { userId } = useLocalSearchParams();
  const { profile, loading, error, isPrivate } = useUserProfile(userId);

  if (loading) {
    return (
      <Layout
        style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}
      >
        <Spinner size='giant' />
      </Layout>
    );
  }

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <Layout style={styles.container}>
        <TopNavigation
          alignment='start'
          title={<UserHeader user={profile} />}
          style={styles.topBar}
        />
        {!isPrivate && (
          <View>
            {profile.courses.length > 0 && (
              <CourseHorizontalList courses={profile.courses} />
            )}

            {profile.about && (
              <>
                <Divider style={styles.divider} />
                <View style={{ paddingHorizontal: 24 }}>
                  <Text category='h6' style={{ marginBottom: 8 }}>
                    Details
                  </Text>
                  <Text category='s1'>{profile.about}</Text>
                </View>
              </>
            )}

            {(profile.linked_in ||
              profile.youtube ||
              profile.personal_website ||
              profile.facebook) && (
              <>
                <Divider style={styles.divider} />
                <View style={{ paddingHorizontal: 24 }}>
                  <Text category='h6' style={{ marginBottom: 8 }}>
                    External Links
                  </Text>
                  {profile.personal_website && (
                    <Pressable
                      style={styles.socialLink}
                      onPress={() => openURL(profile.personal_website)}
                    >
                      <GlobeIcon width={20} height={20} />
                      <Text category='p1' style={styles.socialText}>
                        Personal Website
                      </Text>
                    </Pressable>
                  )}
                  {profile.linked_in && (
                    <Pressable
                      style={styles.socialLink}
                      onPress={() => openURL(profile.linked_in)}
                    >
                      <LinkedInIcon width={20} height={20} />
                      <Text category='p1' style={styles.socialText}>
                        LinkedIn
                      </Text>
                    </Pressable>
                  )}
                  {profile.facebook && (
                    <Pressable
                      style={styles.socialLink}
                      onPress={() => openURL(profile.facebook)}
                    >
                      <FacebookIcon width={20} height={20} />
                      <Text category='p1' style={styles.socialText}>
                        Facebook
                      </Text>
                    </Pressable>
                  )}
                  {profile.youtube && (
                    <Pressable
                      style={styles.socialLink}
                      onPress={() => openURL(profile.youtube)}
                    >
                      <GoogleIcon width={20} height={20} />
                      <Text category='p1' style={styles.socialText}>
                        YouTube
                      </Text>
                    </Pressable>
                  )}
                </View>
              </>
            )}
          </View>
        )}
      </Layout>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 12,
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
  horizontalList: {
    marginVertical: 0,
    paddingHorizontal: 8,
    height: '100%',
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  divider: {
    marginVertical: 12,
  },
  socialLink: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },
  socialText: {
    marginLeft: 8,
    color: 'purple',
  },
});

export default ViewProfileScreen;
