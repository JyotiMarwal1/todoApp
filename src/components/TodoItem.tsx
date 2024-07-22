// src/TodoItem.js
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Images from '../assets/images';
import { deleteTodo, toggleComplete } from '../data/store/slices/todoSlice';
import { colors } from '../themes';
import { getScreenHeight } from '../utils/Common';
import { showAlertWithTwoButtons } from '../utils/UtilityFunc';
import PrimaryButton from './PrimaryButton';
import TodoInput from './TodoInput';

const TodoItem = ({ todo }: any) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const onPressDeleteBtn = () => {
    showAlertWithTwoButtons(
      'Do you want to delete this Todo?',
      (showAlertWithTwoButtons.prototype.handler = async () => {
        dispatch(deleteTodo(todo.id))
      }),
      (showAlertWithTwoButtons.prototype.no = () => {
      }),
    );
  }

  const onPressEditTodoItem = () => {
    setIsEditing(true)
  }


  return (
    <View style={styles.item}>
      {
        isEditing ? (
          <TodoInput todoToEdit={todo} onClose={() => setIsEditing(false)} />
        ) : <>
          <View style={styles.deleteAndEditContainer}>
            {todo.completed ? <TouchableOpacity
              disabled={true}
            >
              <Image
                source={Images.verifyIconn}
                style={[styles.deleteIcon, { marginRight: getScreenHeight(0.5) }]}
              />
            </TouchableOpacity> : null}
            <TouchableOpacity onPress={onPressEditTodoItem}>
              <Image
                source={Images.editIcon}
                style={[styles.deleteIcon, { marginRight: getScreenHeight(0.5) }]}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressDeleteBtn}>
              <Image
                source={Images.deleteIcon}
                style={styles.deleteIcon}
              />
            </TouchableOpacity>
          </View>
          <Text style={[styles.todoItem]}>
            {todo.text}
          </Text>
          {!todo.completed ? <PrimaryButton
            primaryBtnStyle={styles.completeBtn}
            onPrimaryButtonPress={() => dispatch(toggleComplete(todo.id))}
            primaryBtnTitle='Complete'
            primaryBtnTitleStyle={styles.completeBtnTitleStyle}
          /> :
            null}
        </>}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    padding: 10,
    marginVertical: 5,
    backgroundColor: colors.grayF5,
    borderRadius: 5,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
  },
  todoItem: {
    color: colors.black,
    paddingVertical: getScreenHeight(1)

  },
  deleteIcon: {
    width: getScreenHeight(2.5),
    height: getScreenHeight(2.5)
  },
  deleteAndEditContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  completeBtn: {
    backgroundColor: colors.green84,
    paddingVertical: getScreenHeight(1),
    borderRadius: getScreenHeight(1)
  },
  completeBtnTitleStyle: {
    fontSize: getScreenHeight(1.7)
  },
  completeText: {
    textAlign: 'center',
    paddingVertical: getScreenHeight(0.5),
    fontSize: getScreenHeight(2),
    color: colors.green84,
    fontWeight: '800'
  }
});

export default TodoItem;
