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
  insertProject,
  updateProject,
  setSelectedProject
} from '../../state/actions/project-action';
import './project.css';
import ErrorCmp from '../error/error';

export default function ProjectForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const curProject = useSelector((state) => state.projectState.selectedProject);
  const states = useSelector((state) => state.generalState.states);
  const priorities = useSelector((state) => state.generalState.priorities);
  const error = useSelector((state) => state.projectState.error);
  const stateLogin = useSelector((state) => state.generalState.login);
  const [projectForm, setProjectForm] = useState(curProject);

  useEffect(() => {
    const userInfo = getValidatedUserInfo();
    if (userInfo === null || userInfo.title === null) {
      history.push('/login');
    } else {
      dispatch(setUserBySession(userInfo));

      dispatch(fetchStates())
        .then(() => dispatch(fetchPriorities()));
    }
  }, []);

  const handleOnStartDateChange = (date) => {
    console.log(date);
    setProjectForm({
      ...projectForm,
      deadline: new Date(date).toDateString()
    });
  };

  const handleCancelBtn = () => {
    // clear and redirect
    clearObj();
    history.goBack();
  };

  const clearObj = () => {
    dispatch(setSelectedProject({
      id: 0,
      projectName: '',
      description: '',
      isEnabled: true,
      duration: 0,
      deadline: new Date(),
      priorityId: 1,
      stateId: 1
    }));
  };

  const handleOnChange = (e) => {
    setProjectForm({
      ...projectForm,
      [e.target.name]: typeof e.target.value === 'number'
        ? e.target.value : e.target.value.trim()
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (projectForm.id === 0) {
      // INSERT
      projectForm.createdBy = stateLogin.id;
      dispatch(insertProject(history, projectForm));
    } else {
      // UPDATE
      projectForm.updatedBy = stateLogin.id;
      dispatch(updateProject(history, projectForm));
    }

    // clear
    clearObj();
  };

  return (
    <>
      {error && <ErrorCmp err={error} />}
      <div className='card shadow-lg'>
        <h5 className='card-header'>
          Project Form
             <div className="float-right">
            &nbsp;&nbsp; <span className="text-muted">ID:</span>
              &nbsp;{projectForm.id}
          </div>
        </h5>
        <div className='card-body'>
          <form onSubmit={handleOnSubmit}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="projectName">Name*</label>
                <input type="text"
                  className="form-control form-control-sm"
                  id="projectName"
                  name="projectName"
                  value={projectForm.projectName}
                  onChange={handleOnChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-3">
                <label htmlFor="projectName">Duration</label>
                <input type="number"
                  className="form-control form-control-sm"
                  id="duration"
                  name="duration"
                  value={projectForm.duration}
                  onChange={handleOnChange}
                  min="0"
                />
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="startDate">Deadline</label>
                <DatePicker
                  id="startDate"
                  name="startDate"
                  className="form-control form-control-sm"
                  key="startDate"
                  dateFormat='dd/MM/yyyy'
                  selected={projectForm.deadline != null ? new Date(projectForm.deadline) : new Date()}
                  value={projectForm.deadline != null ? new Date(projectForm.deadline) : new Date()}
                  onChange={(date) => handleOnStartDateChange(date)}
                />
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="priorityId">Priority</label>
                <select className="form-control form-control-sm"
                  id="priorityId"
                  name="priorityId"
                  value={projectForm.priorityId}
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
                  value={projectForm.stateId}
                  onChange={handleOnChange}
                >
                  {states && states.map((item) => (
                    <option key={item.id} value={item.id} selected="selected">{item.stateName}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="description">Description*</label>
              <textarea className="form-control form-control-sm"
                id="description"
                name="description"
                value={projectForm.description}
                onChange={handleOnChange}
                rows="4"
                maxLength="255"
                style={{ resize: 'none' }}
                required></textarea>
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
