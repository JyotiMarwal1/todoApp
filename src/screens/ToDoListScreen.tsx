import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TodoInput from '../components/TodoInput'
import TodoList from '../components/ToDoList'

const ToDoListScreen = () => {
  return (
    <View style={styles.container}>
      <Text>ToDoListScreen</Text>
      <TodoInput
      />
      <TodoList
      
      />
    </View>
  )
}

export default ToDoListScreen

const styles = StyleSheet.create({
container:{
flex:1,
backgroundColor: 'white'
}

})