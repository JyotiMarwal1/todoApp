// src/TodoInput.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addTodo } from '../data/store/slices/todoSlice';
import { nanoid } from '@reduxjs/toolkit';
import { colors } from '../themes';
import { getScreenHeight } from '../utils/Common';
import PrimaryButton from './PrimaryButton';

const TodoInput = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const onPressAddTodoBtn = () => {
    if (text.trim()) {
      dispatch(addTodo({
        id: nanoid(),
        text,
        completed: false,
      }));
      setText('');
    }
  };
  
  const onPressClearBtn = () =>{
  setText('')
  
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Add a new todo"
        maxLength={250}
        placeholderTextColor={colors.grayE5}
      />
      <View style={styles.btnContainer}>
      <PrimaryButton
      primaryBtnTitle='Add Todo'
      primaryBtnStyle={styles.todoButtonStyle}
      onPrimaryButtonPress={onPressAddTodoBtn}
      primaryBtnTitleStyle={styles.addTodoButtonTextStyle}
      />
            <PrimaryButton
      primaryBtnTitle='Clear'
      primaryBtnStyle={styles.todoButtonStyle}
      onPrimaryButtonPress={onPressClearBtn}
      primaryBtnTitleStyle={styles.addTodoButtonTextStyle}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    // flexDirection: 'row',
    // padding: 10,
  },
  input: {
    borderColor: colors.primaryIcon,
    borderWidth: 1,
     paddingHorizontal: getScreenHeight(2),
    color: colors.black,
    // paddingVertical: getScreenHeight(3),
     fontSize:getScreenHeight(2),
     borderRadius: getScreenHeight(2),
     
  },
  btnContainer:{
  flexDirection:'row',
  justifyContent:'space-between'
  },
  todoButtonStyle:{
  backgroundColor: colors.primaryIcon  ,
  marginVertical: getScreenHeight(2),
  flex: 0.43,
  borderRadius: getScreenHeight(2),
  paddingVertical: getScreenHeight(1.2),
  },
  addTodoButtonTextStyle:{
  color: colors.white
  }
});

export default TodoInput;
