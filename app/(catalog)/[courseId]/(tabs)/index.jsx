import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { Layout } from '@ui-kitten/components';

const Info = () => {
  return (
    <ScrollView>
      <Layout style={{ height: 2000 }}>
        <Text>Info content goes here</Text>
      </Layout>
    </ScrollView>
  );
};

export default Info;
