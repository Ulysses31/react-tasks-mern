import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getValidatedUserInfo } from '../../shared/shared';
import {
  fetchStates,
  fetchPriorities,
  setUserBySession
} from '../../state/actions/general-action';
import {
  fetchProjects
} from '../../state/actions/project-action';
import {
  insertTask,
  updateTask,
  setSelectedTask
} from '../../state/actions/task-action';
import {
  fetchUsers
} from '../../state/actions/user-action';
import './task.css';
import ErrorCmp from '../error/error';

export default function TaskForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  // get projects for combo box except those that are having done state.
  const projects = useSelector((state) => state.projectState.projects.filter((project) => project.stateId !== 5));
  const curTask = useSelector((state) => state.taskState.selectedTask);
  const users = useSelector((state) => state.userState.users);
  const states = useSelector((state) => state.generalState.states);
  const priorities = useSelector((state) => state.generalState.priorities);
  const stateLogin = useSelector((state) => state.generalState.login);
  const error = useSelector((state) => state.taskState.error);
  const [taskForm, setTaskForm] = useState(curTask);

  useEffect(() => {
    const userInfo = getValidatedUserInfo();
    if (userInfo === null || userInfo.title === null) {
      history.push('/login');
    } else {
      dispatch(setUserBySession(userInfo));

      dispatch(fetchStates())
        .then(() => dispatch(fetchPriorities())
          .then(() => dispatch(fetchProjects())
            .then(() => dispatch(fetchUsers()))));
    }
  }, []);

  const handleCancelBtn = () => {
    // clear and redirect
    clearObj();
    history.goBack();
  };

  const clearObj = () => {
    dispatch(setSelectedTask({
      id: 0,
      taskName: '',
      description: '',
      startDate: new Date(),
      endDate: null,
      isEnabled: true,
      priorityId: 1,
      stateId: 1
    }));
  };

  const handleOnChange = (e) => {
    setTaskForm({
      ...taskForm,
      [e.target.name]: e.target.value
    });
  };

  const handleOnStartDateChange = (date) => {
    setTaskForm({
      ...taskForm,
      startDate: new Date(date).toDateString()
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (taskForm.id === 0) {
      // INSERT
      console.log('INSERT');
      taskForm.createdBy = stateLogin.id;
      dispatch(insertTask(history, taskForm));
    } else {
      // UPDATE
      console.log('UPDATE');
      taskForm.updatedBy = stateLogin.id;
      dispatch(updateTask(history, taskForm));
    }

    // clear
    clearObj();
  };

  return (
    <>
      {error && <ErrorCmp err={error} />}
      <div className='card shadow-lg'>
        <h5 className='card-header'>
          Task Form
          </h5>
        <div className='card-body'>
          <form onSubmit={handleOnSubmit}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="projectId">Project*</label>
                <select
                  className="form-control form-control-sm"
                  id="projectId"
                  name="projectId"
                  value={taskForm.projectId}
                  onChange={handleOnChange}
                  required
                >
                  <option key="pj" value="" defaultValue>---</option>
                  {projects && projects.map((item) => (
                    <option key={item.id} value={item.id}>{item.projectName}</option>
                  ))}
                </select>
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="startDate">Start Date</label>
                <DatePicker
                  id="startDate"
                  name="startDate"
                  className="form-control form-control-sm"
                  key="startDate"
                  dateFormat='dd/MM/yyyy'
                  selected={taskForm.startDate != null ? new Date(taskForm.startDate) : new Date()}
                  value={taskForm.startDate != null ? new Date(taskForm.startDate) : new Date()}
                  onChange={(date) => handleOnStartDateChange(date)}
                />
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="assignedTo">Assigned To*</label>
                <select className="form-control form-control-sm"
                  id="assignedTo"
                  name="assignedTo"
                  value={taskForm.assignedTo}
                  onChange={handleOnChange}
                  required
                >
                  <option key='usr' value='' defaultValue>---</option>
                  {users && users.map((item) => (
                    <option key={item.id} value={item.id}>{item.title} ({item.department.name})</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="taskName">Name*</label>
                <input type="text"
                  className="form-control form-control-sm"
                  id="taskName"
                  name="taskName"
                  value={taskForm.taskName}
                  onChange={handleOnChange}
                  required
                />
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="priorityId">Priority</label>
                <select className="form-control form-control-sm"
                  id="priorityId"
                  name="priorityId"
                  value={taskForm.priorityId}
                  onChange={handleOnChange}
                >
                  {priorities && priorities.map((item) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="stateId">State</label>
                <select className="form-control form-control-sm"
                  id="stateId"
                  name="stateId"
                  value={taskForm.stateId}
                  onChange={handleOnChange}
                >
                  {states && states.map((item) => (
                    <option key={item.id} value={item.id}>{item.stateName}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-12">
                <label htmlFor="description">Description*</label>
                <textarea className="form-control form-control-sm"
                  id="description"
                  name="description"
                  value={taskForm.description}
                  onChange={handleOnChange}
                  rows="4"
                  maxLength="255"
                  style={{ resize: 'none' }}
                  required></textarea>
              </div>
            </div>
            <button type="submit"
              className="btn btn-primary shadow-sm"
            >
              <i className="bi bi-hdd"></i> Save
						</button>
            {' '}
            <button type="button"
              className="btn btn-danger shadow-sm"
              onClick={handleCancelBtn}
            >
              <i className="bi bi-x-square"></i> Cancel
						</button >
          </form >
        </div>
      </div>
    </>
  );
}
