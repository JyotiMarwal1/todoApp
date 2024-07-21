// src/TodoItem.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { deleteTodo, toggleComplete } from '../data/store/slices/todoSlice';
import { colors } from '../themes';
import { getScreenHeight } from '../utils/Common';

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.item}>
      <Text style={[styles.todoItem,{ textDecorationLine: todo.completed ? 'line-through' : 'none' }]}>
        {todo.text}
      </Text>
      <Button title="Complete" onPress={() => dispatch(toggleComplete(todo.id))} />
      <Button title="Delete" onPress={() => dispatch(deleteTodo(todo.id))} />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
  },
  todoItem:{
  color: colors.black,
  
  }
});

export default TodoItem;
