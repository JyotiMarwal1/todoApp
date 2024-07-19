import { combineReducers } from 'redux';
import homeReducer from './homeSlice';
import userDetailReducer from './userDetailSlice';


const rootReducer = combineReducers({
  homeState: homeReducer,
  userDetailState: userDetailReducer,
});

export default rootReducer;
