// src/todoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    deleteTodo: (state, action) => {
      return state.filter(todo => todo.id !== action.payload);
    },
    editTodo: (state, action) => {
      const { id, text } = action.payload;
      const existingTodo = state.find(todo => todo.id === id);
      if (existingTodo) {
        existingTodo.text = text;
      }
    },
    toggleComplete: (state, action) => {
      const existingTodo = state.find(todo => todo.id === action.payload);
      if (existingTodo) {
        existingTodo.completed = !existingTodo.completed;
      }
    },
  },
});

export const { addTodo, deleteTodo, editTodo, toggleComplete } = todoSlice.actions;

export default todoSlice.reducer;
