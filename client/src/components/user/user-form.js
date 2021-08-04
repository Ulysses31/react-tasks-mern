import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './user.css';
import { getValidatedUserInfo } from '../../shared/shared';
import { fetchDepartments } from '../../state/actions/department-action';
import { setUserBySession } from '../../state/actions/general-action';
import {
  fetchRoles,
  insertUser,
  updateUser,
  setSelectedUser
} from '../../state/actions/user-action';
import ErrorCmp from '../error/error';

export default function UserForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const curUser = useSelector(
    (state) => state.userState.selectedUser
  );
  const roles = useSelector(
    (state) => state.userState.roles
  );
  const departments = useSelector(
    (state) => state.departmentState.departments
  );
  const error = useSelector(
    (state) => state.userState.error
  );
  const stateLogin = useSelector(
    (state) => state.generalState.login
  );
  const [userForm, setUserForm] = useState(curUser);

  useEffect(() => {
    const userInfo = getValidatedUserInfo();
    if (userInfo === null || userInfo.title === null) {
      history.push('/login');
    } else {
      dispatch(setUserBySession(userInfo));

      dispatch(fetchRoles()).then(() =>
        dispatch(fetchDepartments())
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
      setSelectedUser({
        _id: 0,
        username: '',
        password: '',
        position: '',
        department: '',
        email: '',
        title: '',
        isEnabled: true,
        role: ''
      })
    );
  };

  const handleOnChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (userForm._id === 0) {
      // INSERT
      userForm._id = null;
      userForm.createdBy = stateLogin.title;
      dispatch(insertUser(history, userForm));
    } else {
      // UPDATE
      userForm.updatedBy = stateLogin.title;
      userForm.updatedAt = new Date();
      dispatch(updateUser(history, userForm));
    }

    // clear
    clearObj();
  };

  return (
    <>
      {error && <ErrorCmp err={error} />}
      <div className='card shadow-lg'>
        <h5 className='card-header'>
          User Form
          <div className='float-right'>
            &nbsp;&nbsp;{' '}
            <span className='text-muted'>ID:</span>
            &nbsp;{userForm._id}
          </div>
        </h5>
        <div className='card-body'>
          <form onSubmit={handleOnSubmit}>
            <div className='form-row'>
              <div className='form-group col-md-3'>
                <label htmlFor='department'>
                  Department*
                </label>
                <select
                  className='form-control form-control-sm'
                  id='department'
                  name='department'
                  value={userForm.department}
                  onChange={handleOnChange}
                  required
                >
                  <option key='pj' value='' defaultValue>
                    ---
                  </option>
                  {departments &&
                    departments.map((dprt) => (
                      <option
                        key={dprt._id}
                        value={dprt.name}
                      >
                        {dprt.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className='form-group col-md-3'>
                <label htmlFor='email'>Position*</label>
                <input
                  type='mail'
                  className='form-control form-control-sm'
                  id='position'
                  name='position'
                  value={userForm.position}
                  onChange={handleOnChange}
                  maxLength='100'
                  required
                />
              </div>
              <div className='form-group col-md-3'>
                <label htmlFor='title'>Title*</label>
                <input
                  type='text'
                  className='form-control form-control-sm'
                  id='title'
                  name='title'
                  value={userForm.title}
                  onChange={handleOnChange}
                  maxLength='100'
                  required
                />
              </div>
              <div className='form-group col-md-3'>
                <label htmlFor='role'>Role*</label>
                <select
                  className='form-control form-control-sm'
                  id='role'
                  name='role'
                  value={userForm.role}
                  onChange={handleOnChange}
                  required
                >
                  <option key='rl' value=''>
                    ---
                  </option>
                  {roles &&
                    roles.map((role) => (
                      <option
                        key={role._id}
                        value={role.role}
                      >
                        {role.role}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className='form-row'>
              <div className='form-group col-md-3'>
                <label htmlFor='email'>Email*</label>
                <input
                  type='mail'
                  className='form-control form-control-sm'
                  id='email'
                  name='email'
                  value={userForm.email}
                  onChange={handleOnChange}
                  required
                />
              </div>
              <div className='form-group col-md-3'>
                <label htmlFor='username'>Username*</label>
                <input
                  type='text'
                  className='form-control form-control-sm'
                  id='username'
                  name='username'
                  value={userForm.username}
                  onChange={handleOnChange}
                  required
                />
              </div>
              <div className='form-group col-md-3'>
                <label htmlFor='password'>Password*</label>
                <input
                  type='password'
                  className='form-control form-control-sm'
                  id='password'
                  name='password'
                  value={userForm.password}
                  onChange={handleOnChange}
                  required
                />
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
