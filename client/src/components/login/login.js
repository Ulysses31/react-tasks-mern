import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
  getValidatedUserInfo,
  saveValidatedUserInfo
} from '../../shared/shared';
import {
  getUserByLogin,
  setUserBySession
} from '../../state/actions/general-action';
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
  const history = useHistory();
  const [login, setLogin] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    const userInfo = getValidatedUserInfo();
    if (userInfo.id > 0) {
      dispatch(setUserBySession(userInfo));
    }
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    dispatch(getUserByLogin(login)).then((response) => {
      if (response) {
        const validatedUserInfo = {
          _id: response.data._id,
          title: response.data.title,
          email: response.data.email,
          department: response.data.department,
          position: response.data.position,
          role: response.data.role
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
              React Tasks &copy; 2021
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
