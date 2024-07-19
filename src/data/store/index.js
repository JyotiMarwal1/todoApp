import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './slices';

export default function setupStore() {
  let store;
  store = configureStore({
    reducer: rootReducer,
    middleware: [thunkMiddleware]
  });
  return store;
}
