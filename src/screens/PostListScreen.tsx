import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from './src/features/posts/postsSlice';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { postThunk } from '../data/store/thunks/authThunk';

const PostListScreen = () => {
    const dispatch = useDispatch();
    const { posts, status, error } = useSelector((state) => state.posts);
  
    useEffect(() => {
    //   dispatch(fetchPosts());
    dispatch(postThunk())
    }, []);
  
    if (status === 'loading') {
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
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{item.body}</Text>
          </View>
        )}
      />
    );
  };
  
export default PostListScreen;
