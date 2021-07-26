import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getValidatedUserInfo } from '../../../shared/shared';
import { setUserBySession } from '../../../state/actions/general-action';
import {
  insertSubTask,
  setSelectedSubTask,
  updateSubTask
} from '../../../state/actions/task-action';
import './subtask.css';
import ErrorCmp from '../../error/error';

export default function SubTaskForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.taskState.error);
  const curSubTask = useSelector((state) => state.taskState.selectedSubTask);
  const curTask = useSelector((state) => state.taskState.taskById);
  const stateLogin = useSelector((state) => state.generalState.login);

  const [subTaskForm, setSubTaskForm] = useState(curSubTask);

  useEffect(() => {
    const userInfo = getValidatedUserInfo();
    if (userInfo === null || userInfo.title === null) {
      history.push('/login');
    } else {
      dispatch(setUserBySession(userInfo));
    }
  }, []);

  const handleCancelBtn = () => {
    // clear and redirect
    clearObj();
    history.goBack();
  };

  const clearObj = () => {
    dispatch(setSelectedSubTask({
      id: 0,
      subTaskName: '',
      description: '',
      startDate: new Date(),
      duration: 0,
      taskId: 0,
      isEnabled: true
    }));
  };

  const handleOnChange = (e) => {
    setSubTaskForm({
      ...subTaskForm,
      [e.target.name]: e.target.name === 'duration'
        ? e.target.value === ''
          ? '0'
          : e.target.value
        : e.target.value
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (curSubTask.id === 0) {
      // INSERT
      console.log('INSERT');
      subTaskForm.taskId = curTask.id; // task id comment belongs.
      subTaskForm.creatorId = stateLogin.id; // logged in user
      subTaskForm.createdBy = stateLogin.id; // logged in user
      dispatch(insertSubTask(history, subTaskForm));
    } else {
      // UPDATE
      console.log('UPDATE');
      subTaskForm.updatedBy = stateLogin.id; // logged in user
      subTaskForm.editorId = stateLogin.id; // logged in user
      dispatch(updateSubTask(history, subTaskForm));
    }

    // clear
    clearObj();
  };

  const handleOnStartDateChange = (date) => {
    setSubTaskForm({
      ...subTaskForm,
      startDate: new Date(date).toDateString()
    });
  };

  return (
    <>
      {error && <ErrorCmp err={error} />}
      <div className='card shadow-lg'>
        <h5 className='card-header'>
          <i className="bi bi-chat-right-text"></i> Sub task Form
					</h5>
        <div className='card-body'>
          <form onSubmit={handleOnSubmit}>
            <div className="form-row">
              <div className="form-group col-md-3">
                <label htmlFor="subTaskName">Name*</label>
                <input type="text"
                  className="form-control form-control-sm"
                  id="subTaskName"
                  name="subTaskName"
                  value={subTaskForm.subTaskName}
                  onChange={handleOnChange}
                  required
                />
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="subTaskName">Duration*</label>
                <input type="number"
                  className="form-control form-control-sm"
                  id="duration"
                  name="duration"
                  value={subTaskForm.duration}
                  onChange={handleOnChange}
                  min="0"
                />
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="startDate">Start Date</label>
                <DatePicker
                  id="startDate"
                  name="startDate"
                  className="form-control form-control-sm"
                  key="startDate"
                  minDate={new Date(curTask.startDate)}
                  dateFormat='dd/MM/yyyy'
                  selected={subTaskForm.startDate != null ? new Date(subTaskForm.startDate) : new Date()}
                  value={subTaskForm.startDate != null ? new Date(subTaskForm.startDate) : new Date()}
                  onChange={(date) => handleOnStartDateChange(date)}
                />
              </div>
              <div className="form-group col-md-12">
                <label htmlFor="description">Description*</label>
                <textarea className="form-control form-control-sm"
                  id="description"
                  name="description"
                  value={subTaskForm.description}
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
