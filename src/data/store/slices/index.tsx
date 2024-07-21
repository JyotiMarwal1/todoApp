import { combineReducers } from 'redux';
import homeReducer from './homeSlice';
import userDetailReducer from './userDetailSlice';
import todoReducer from './todoSlice';
import postReducer from './postSlice';


const rootReducer = combineReducers({
  homeState: homeReducer,
  userDetailState: userDetailReducer,
  todos: todoReducer,
  posts: postReducer
});

export default rootReducer;
