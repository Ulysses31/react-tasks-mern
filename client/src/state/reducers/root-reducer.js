import { combineReducers } from 'redux';
import departmentReducer from './department-reducer';
import generalReducer from './general-reducer';
import projectReducer from './project-reducer';
import taskReducer from './task-reducer';
import userReducer from './user-reducer';

export default combineReducers({
  generalState: generalReducer,
  projectState: projectReducer,
  taskState: taskReducer,
  userState: userReducer,
  departmentState: departmentReducer
});
