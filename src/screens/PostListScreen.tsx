// src/PostListScreen.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, RefreshControl } from 'react-native';
import { postThunk } from '../data/store/thunks/postThunk';
import PostItem from '../components/PostItem';
import { colors } from '../themes';
import { getScreenHeight } from '../utils/Common';

const PostListScreen = () => {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.posts);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(postThunk());
  }, [dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(postThunk());
    setRefreshing(false);
  };

  if (status === 'loading' && !refreshing) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (status === 'failed') {
    return (
      <View>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostItem title={item.title} body={item.body} />}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  );
};

export default PostListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteBackground,
  },
  contentContainer: {
    marginTop: getScreenHeight(1),
  },
});
