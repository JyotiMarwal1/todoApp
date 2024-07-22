import React from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TodoInput from '../components/TodoInput'
import TodoList from '../components/TodoList'
import { getScreenHeight } from '../utils/Common'

const ToDoListScreen = () => {
  return (
    <KeyboardAwareScrollView
      bounces={false}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      enableOnAndroid={true}
      enableAutomaticScroll={Platform.OS === 'ios'}
      contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <TodoInput
        />
        <TodoList

        />
      </View>
    </KeyboardAwareScrollView>
  )
}

export default ToDoListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: getScreenHeight(2)
  }

})