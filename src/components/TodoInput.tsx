// src/TodoInput.js
import { nanoid } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { addTodo, editTodo } from '../data/store/slices/todoSlice';
import { colors } from '../themes';
import { getScreenHeight } from '../utils/Common';
import PrimaryButton from './PrimaryButton';

const TodoInput = ({ todoToEdit, onClose }) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (todoToEdit) {
      setText(todoToEdit.text);
    }
  }, [todoToEdit]);

  const onPressAddTodoBtn = () => {
    if (text.trim()) {
      if (todoToEdit) {
        dispatch(editTodo({
          id: todoToEdit.id,
          text,
        }));
        onClose();
      } else {
        dispatch(addTodo({
          id: nanoid(),
          text,
          completed: false,
        }));
        setText('');
      }
    }

  };

  const onPressClearBtn = () => {
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
          primaryBtnTitle={todoToEdit ? "Save" : "Add"}
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
      {todoToEdit && <PrimaryButton
        primaryBtnTitle={'Cancel'}
        primaryBtnStyle={styles.cancelBtnStyle}
        onPrimaryButtonPress={onClose}
        primaryBtnTitleStyle={styles.addTodoButtonTextStyle}
      />
      }
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
    fontSize: getScreenHeight(2),
    borderRadius: getScreenHeight(2),

  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  todoButtonStyle: {
    backgroundColor: colors.primaryIcon,
    marginVertical: getScreenHeight(2),
    flex: 0.43,
    borderRadius: getScreenHeight(2),
    paddingVertical: getScreenHeight(1.2),
  },
  addTodoButtonTextStyle: {
    color: colors.white
  },
  cancelBtnStyle: {

    borderRadius: getScreenHeight(2),
    paddingVertical: getScreenHeight(1.2),
    backgroundColor: colors.red00
  }
});

export default TodoInput;
