import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './department.css';
import { getValidatedUserInfo } from '../../shared/shared';
import {
  insertDepartment,
  setSelectedDepartment,
  updateDepartment
} from '../../state/actions/department-action';
import { setUserBySession } from '../../state/actions/general-action';
import ErrorCmp from '../error/error';

export default function DepartmentForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const department = useSelector((state) => state.departmentState.selectedDepartment);
  const error = useSelector((state) => state.projectState.error);
  const stateLogin = useSelector((state) => state.generalState.login);
  const [departmentForm, setdepartmentForm] = useState(department);

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
    dispatch(setSelectedDepartment({
      id: 0,
      name: '',
      description: '',
      isEnabled: true
    }));
  };

  const handleOnChange = (e) => {
    setdepartmentForm({
      ...departmentForm,
      [e.target.name]: e.target.value
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (departmentForm.id === 0) {
      // INSERT
      departmentForm.createdBy = stateLogin.id;
      dispatch(insertDepartment(history, departmentForm));
    } else {
      // UPDATE
      departmentForm.updatedBy = stateLogin.id;
      dispatch(updateDepartment(history, departmentForm));
    }

    // clear
    clearObj();
  };

  return (
    <>
      {error && <ErrorCmp err={error} />}
      <div className='card shadow-lg'>
        <h5 className='card-header'>
          Department Form
						 <div className="float-right">
            &nbsp;&nbsp; <span className="text-muted">ID:</span>
							&nbsp;{departmentForm.id}
          </div>
        </h5>
        <div className='card-body'>
          <form onSubmit={handleOnSubmit}>
            <div className="form-row">
              <div className="form-group col-md-3">
                <label htmlFor="name">Name*</label>
                <input type="mail"
                  className="form-control form-control-sm"
                  id="name"
                  name="name"
                  value={departmentForm.name}
                  onChange={handleOnChange}
                  maxLength="100"
                  required
                />
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="description">Description*</label>
                <input type="mail"
                  className="form-control form-control-sm"
                  id="description"
                  name="description"
                  value={departmentForm.description}
                  onChange={handleOnChange}
                  required
                />
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
