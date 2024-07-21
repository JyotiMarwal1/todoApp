// src/components/PostItem.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../themes';
import { getScreenHeight } from '../utils/Common';
import { getScreenWidth } from '../utils/commonManager';

const PostItem = ({ title, body }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: getScreenHeight(1),
    borderRadius: getScreenHeight(1),
    borderWidth: getScreenWidth(0.2),
    marginVertical: getScreenHeight(0.7),
    // marginTop: getScreenHeight(1),
    borderColor: '#A8A8A8',
    backgroundColor: '#F5FFFA'
  },
  title: {
    fontSize: getScreenHeight(1.7),
    fontWeight: 'bold',
    color: colors.black,
    paddingBottom: getScreenHeight(0.7)
  },
  body: {
    fontSize: getScreenHeight(1.5),
    color: '#505050'
  },
});

export default PostItem;
