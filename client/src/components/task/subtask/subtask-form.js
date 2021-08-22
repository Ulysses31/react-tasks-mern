import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { getValidatedUserInfo } from '../../../shared/shared';
import {
  fetchComputeDurations,
  getDefaultComputedDurationById,
  setUserBySession
} from '../../../state/actions/general-action';
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
  const error = useSelector(
    (state) => state.taskState.error
  );
  const curSubTask = useSelector(
    (state) => state.taskState.selectedSubTask
  );
  const curTask = useSelector(
    (state) => state.taskState.taskById
  );
  const stateLogin = useSelector(
    (state) => state.generalState.login
  );
  const computeDurations = useSelector(
    (state) => state.generalState.computeDurations
  );

  const [subTaskForm, setSubTaskForm] =
    useState(curSubTask);
  const result = useSelector(
    (state) =>
      Number.parseFloat(subTaskForm.duration) *
      Number.parseFloat(
        state.generalState.defaultComputedDuration.factor
      )
  );

  useEffect(() => {
    const userInfo = getValidatedUserInfo();
    if (userInfo === null || userInfo.title === null) {
      history.push('/login');
    } else {
      dispatch(setUserBySession(userInfo));
      dispatch(fetchComputeDurations()).then(() =>
        curSubTask._id === 0
          ? dispatch(
              getDefaultComputedDurationById(
                '61121d2e3cd3f7eeb6047e32'
              )
            )
          : dispatch(
              getDefaultComputedDurationById(
                subTaskForm.durationUnit
              )
            )
      );
    }
  }, []);

  const handleCancelBtn = () => {
    // clear and redirect
    clearObj();
    history.goBack();
  };

  const clearObj = () => {
    dispatch(
      setSelectedSubTask({
        _id: 0,
        subTaskName: '',
        description: '',
        startDate: new Date(),
        startTime: null,
        duration: 0,
        computedDuration: 0,
        durationUnit: 0,
        task: null,
        guid: '',
        isEnabled: true,
        createdBy: null,
        updatedAt: null,
        updatedBy: null
      })
    );
  };

  const handleOnChange = (e) => {
    // set the selected computed unit duration as default computed unit in general state
    if (e.target.name === 'durationUnit') {
      dispatch(
        getDefaultComputedDurationById(e.target.value)
      );
    }

    setSubTaskForm({
      ...subTaskForm,
      [e.target.name]:
        e.target.name === 'duration'
          ? e.target.value === ''
            ? 0
            : e.target.value
          : typeof e.target.value === 'number'
          ? e.target.value
          : e.target.value.trim()
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    subTaskForm.computedDuration =
      Number.parseFloat(result);

    // console.log(subTaskForm);

    if (subTaskForm._id === 0) {
      // INSERT
      subTaskForm.guid = uuidv4();
      subTaskForm.task = curTask._id; // task id comment belongs.
      subTaskForm.createdBy = stateLogin.id; // logged in user
      dispatch(insertSubTask(history, subTaskForm));
    } else {
      // UPDATE
      subTaskForm.updatedBy = stateLogin.id; // logged in user
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

  const handleOnStartTimeChange = (time) => {
    setSubTaskForm({
      ...subTaskForm,
      startTime: time.toLocaleString('en-US')
    });
  };

  return (
    <>
      {error && <ErrorCmp err={error} />}
      <div className='card shadow-lg'>
        <h5 className='card-header'>
          <i className='bi bi-chat-right-text'></i> Sub task
          Form
        </h5>
        <div className='card-body'>
          <form onSubmit={handleOnSubmit}>
            <div className='form-row'>
              <div className='form-group col-md-2'>
                <label htmlFor='subTaskName'>Name*</label>
                <input
                  type='text'
                  className='form-control form-control-sm'
                  id='subTaskName'
                  name='subTaskName'
                  value={subTaskForm.subTaskName}
                  onChange={handleOnChange}
                  required
                />
              </div>
            </div>
            <div className='form-row'>
              <div className='form-group col-md-2'>
                <label htmlFor='startDate'>
                  Start Date
                </label>
                <DatePicker
                  id='startDate'
                  name='startDate'
                  className='form-control form-control-sm'
                  key='startDate'
                  minDate={new Date(curTask.startDate)}
                  dateFormat='dd/MM/yyyy'
                  selected={
                    subTaskForm.startDate != null
                      ? new Date(subTaskForm.startDate)
                      : new Date()
                  }
                  value={
                    subTaskForm.startDate != null
                      ? new Date(subTaskForm.startDate)
                      : new Date()
                  }
                  onChange={(date) =>
                    handleOnStartDateChange(date)
                  }
                />
              </div>
              <div className='form-group col-md-2'>
                <label htmlFor='startTime'>
                  Start Time*
                </label>
                <DatePicker
                  id='startTime'
                  name='startTime'
                  className='form-control form-control-sm'
                  key='startTime'
                  dateFormat='HH:mm'
                  selected={
                    subTaskForm.startTime != null
                      ? new Date(subTaskForm.startTime)
                      : ''
                  }
                  value={
                    subTaskForm.startTime != null
                      ? new Date(subTaskForm.startTime)
                      : ''
                  }
                  timeIntervals={30}
                  timeCaption='Time'
                  showTimeSelect
                  showTimeSelectOnly
                  onChange={(date) =>
                    handleOnStartTimeChange(date)
                  }
                  required
                />
              </div>
            </div>
            <div className='form-row'>
              <div className='form-group col-md-2'>
                <label htmlFor='duration'>Duration*</label>
                <input
                  type='number'
                  className='form-control form-control-sm'
                  id='duration'
                  name='duration'
                  value={Number.parseFloat(
                    subTaskForm.duration
                  )}
                  onChange={handleOnChange}
                  min='0'
                  step='.01'
                />
              </div>
              <div className='form-group col-md-2'>
                <label htmlFor='durationUnit'>
                  DurationUnit
                </label>
                <select
                  className='form-control form-control-sm'
                  id='durationUnit'
                  name='durationUnit'
                  value={subTaskForm.durationUnit}
                  onChange={handleOnChange}
                  required
                >
                  <option key='none' value=''>
                    ---
                  </option>
                  {computeDurations &&
                    computeDurations.map((item) => (
                      <option
                        key={item._id}
                        value={item._id}
                        selected='selected'
                      >
                        {item.code}
                      </option>
                    ))}
                </select>
              </div>
              <div className='form-group col-md-2'>
                <label htmlFor='computedDuration'>
                  Duration (Hours)
                </label>
                <input
                  type='text'
                  className='form-control form-control-sm'
                  id='computedDuration'
                  name='computedDuration'
                  value={
                    Number.parseFloat(result).toFixed(2) ||
                    Number.parseFloat(
                      subTaskForm.computedDuration
                    ).toFixed(2)
                  }
                  onChange={handleOnChange}
                  placeholder='0'
                  readOnly
                />
              </div>
            </div>
            <div className='form-row'>
              <div className='form-group col-md-12'>
                <label htmlFor='description'>
                  Description*
                </label>
                <textarea
                  className='form-control form-control-sm'
                  id='description'
                  name='description'
                  value={subTaskForm.description}
                  onChange={handleOnChange}
                  rows='4'
                  maxLength='255'
                  style={{ resize: 'none' }}
                  required
                ></textarea>
              </div>
            </div>
            <button
              type='submit'
              className='btn btn-primary shadow-sm'
            >
              <i className='bi bi-hdd'></i> Save
            </button>{' '}
            <button
              type='button'
              className='btn btn-danger shadow-sm'
              onClick={handleCancelBtn}
            >
              <i className='bi bi-x-square'></i> Cancel
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
