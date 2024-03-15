import React from 'react';
import { Divider } from '@ui-kitten/components';
import EnrolledCoursesList from '../learning/EnrolledCoursesList';
import PublishedCoursesList from './PublishedCoursesList';

const SignedInUserProfile = () => {
  return (
    <>
      <EnrolledCoursesList />
      <Divider />
      <PublishedCoursesList />
    </>
  );
};

export default SignedInUserProfile;
