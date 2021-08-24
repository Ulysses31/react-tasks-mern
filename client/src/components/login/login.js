import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
  getValidatedUserInfo,
  saveValidatedUserInfo
} from '../../shared/shared';
import { fetchDepartments } from '../../state/actions/department-action';
import {
  fetchPriorities,
  fetchStates,
  getUserByLogin,
  setUserBySession
} from '../../state/actions/general-action';
import { fetchRoles } from '../../state/actions/user-action';
import ErrorCmp from '../error/error';
import './login.css';

export default function Login() {
  const dispatch = useDispatch();
  const stateLogin = useSelector(
    (state) => state.generalState.login
  );
  const error = useSelector(
    (state) => state.generalState.error
  );
  const department = useSelector(
    (state) => state.departmentState.departments
  );
  const role = useSelector(
    (state) => state.userState.roles
  );
  const history = useHistory();
  const [login, setLogin] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    dispatch(fetchDepartments())
      .then(() => dispatch(fetchRoles()))
      .then(() => dispatch(fetchStates()))
      .then(() => dispatch(fetchPriorities()))
      .then(() => {
        const userInfo = getValidatedUserInfo();
        if (userInfo.id > 0) {
          dispatch(setUserBySession(userInfo));
        }
      });
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    dispatch(getUserByLogin(login)).then((response) => {
      if (response !== undefined) {
        console.log(response);
        const validatedUserInfo = {
          id: response.data._id,
          title: response.data.title,
          email: response.data.email,
          department: department.find(
            (item) => item._id === response.data.department
          ).name,
          position: response.data.position,
          role: role.find(
            (item) => item._id === response.data.role
          ).role
        };
        saveValidatedUserInfo(validatedUserInfo);
        history.push('/');
      }
    });
  };

  const handleChangeLoginInfo = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className='row'>
      <div className='col-lg-12'>
        {error && <ErrorCmp err={error} />}
        {!stateLogin ? (
          <form
            className='form-signin'
            onSubmit={handleFormSubmit}
          >
            <img
              id='singin-logo'
              src='/images/signin.gif'
              alt=''
            />
            <h1
              className='h3 m-3 font-weight-bold text-center'
              style={{ fontSize: '1.3em !important' }}
            >
              Please sign in
            </h1>
            <label htmlFor='email' className='sr-only'>
              Email address
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={login.email}
              onChange={handleChangeLoginInfo}
              className='form-control'
              placeholder='Email address'
              required
              autoFocus
            />
            <label htmlFor='password' className='sr-only'>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              value={login.password}
              onChange={handleChangeLoginInfo}
              className='form-control'
              placeholder='Password'
              required
            />
            <div className='checkbox mb-3'>
              <label>
                <input
                  type='checkbox'
                  value='remember-me'
                  disabled
                />{' '}
                Remember me
              </label>
            </div>
            <button
              className='btn btn-lg btn-primary btn-block'
              type='submit'
            >
              Sign in
            </button>
            <p className='mt-5 mb-3 text-muted text-center'>
              React Projects - Tasks &copy; 2021
            </p>
          </form>
        ) : (
          <h1>
            Already logged in <b>{stateLogin.title}</b>!
          </h1>
        )}
      </div>
    </div>
  );
}
