// src/TodoList.js
import React from 'react';
import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';

const TodoList = () => {
  const todos = useSelector((state) => state.todos);

  return (
    <View>
      <FlatList
        data={todos}
        renderItem={({ item }) => <TodoItem todo={item} />}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default TodoList;
