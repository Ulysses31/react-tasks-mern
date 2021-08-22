const express = require('express');
const router = express.Router();

const {
  getProjectList,
  getProjectById,
  getActiveProjects,
  insertProject,
  updateProject,
  deleteProject,
  deactivateProject
} = require('../controller/project');

const {
  //   getTaskList,
  getActiveTasks,
  getTaskById,
  getTaskByUser,
  getProjectByUser,
  insertTask,
  updateTask
  //   deleteTask
} = require('../controller/task');

const {
  getCommentList,
  //   getCommentById,
  insertComment,
  updateComment
  //   deleteComment
} = require('../controller/comment');

// const {
//   getSubTaskList,
//   getSubTaskById,
//   insertSubTask,
//   updateSubTask,
//   deleteSubTask
// } = require('../controller/subTask');

const {
  getUserList,
  getUserById,
  getUserByLogin,
  insertUser,
  updateUser,
  deleteUser
} = require('../controller/user');

const {
  getUserRoleList,
  getUserRoleById,
  insertUserRole,
  updateUserRole,
  deleteUserRole
} = require('../controller/userRole');

const {
  getStateList,
  getStateById,
  insertState,
  updateState,
  deleteState
} = require('../controller/state');

const {
  getPriorityList,
  getPriorityById,
  insertPriority,
  updatePriority,
  deletePriority
} = require('../controller/priority');

const {
  getDepartmentList,
  getDepartmentById,
  insertDepartment,
  updateDepartment,
  deleteDepartment
} = require('../controller/department');

const {
  getComputeddurationList,
  getComputeddurationById,
  insertComputedduration,
  updateComputedduration,
  deleteComputedduration
} = require('../controller/computeDuration');

// Project
router.get('/project', getProjectList);
router.get('/project/count', getActiveProjects);
router.get('/project/:id', getProjectById);
router.get(
  '/project/byuser/:user/from/:curDateFrom/to/:curDateTo',
  getProjectByUser
);
router.post('/project/deactivate/:id', deactivateProject);
router.post('/project', insertProject);
router.put('/project/:id', updateProject);
router.delete('/project/:id', deleteProject);

// Task
// router.get('/task', getTaskList);
router.get('/task/count', getActiveTasks);
router.get('/task/:id', getTaskById);
router.get(
  '/task/byuser/:user/from/:dateFrom/to/:dateTo',
  getTaskByUser
);
router.post('/task', insertTask);
router.put('/task/:id', updateTask);
// router.delete('/task/:id', deleteTask);

// Comment
router.get('/comment', getCommentList);
// router.get('/comment/:id', getCommentById);
router.post('/comment', insertComment);
router.put('/comment/:id', updateComment);
// router.delete('/comment/:id', deleteComment);

// SubTask
// router.get('/subTask', getSubTaskList);
// router.get('/subTask/:id', getSubTaskById);
// router.post('/subTask', insertSubTask);
// router.put('/subTask/:id', updateSubTask);
// router.delete('/subTask/:id', deleteSubTask);

// User
router.get('/user', getUserList);
router.get('/user/:id', getUserById);
router.post('/user', insertUser);
router.post('/user/ByLogin', getUserByLogin);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

// UserRole
router.get('/userRole', getUserRoleList);
router.get('/userRole/:id', getUserRoleById);
router.post('/userRole', insertUserRole);
router.put('/userRole/:id', updateUserRole);
router.delete('/userRole/:id', deleteUserRole);

// State
router.get('/state', getStateList);
router.get('/state/:id', getStateById);
router.post('/state', insertState);
router.put('/state/:id', updateState);
router.delete('/state/:id', deleteState);

// Priority
router.get('/priority', getPriorityList);
router.get('/priority/:id', getPriorityById);
router.post('/priority', insertPriority);
router.put('/priority/:id', updatePriority);
router.delete('/priority/:id', deletePriority);

// Department
router.get('/department', getDepartmentList);
router.get('/department/:id', getDepartmentById);
router.post('/department', insertDepartment);
router.put('/department/:id', updateDepartment);
router.delete('/department/:id', deleteDepartment);

// Compute Duration
router.get('/computeDuration', getComputeddurationList);
router.get('/computeDuration/:id', getComputeddurationById);
router.post('/computeDuration', insertComputedduration);
router.put('/computeDuration/:id', updateComputedduration);
router.delete(
  '/computeDuration/:id',
  deleteComputedduration
);

module.exports = router;
