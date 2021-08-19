import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getValidatedUserInfo } from '../../../shared/shared';
import {
  insertSelectedComputeDuration,
  setSelectedComputeDuration,
  setUserBySession,
  updateComputeDuration
} from '../../../state/actions/general-action';
import ErrorCmp from '../../error/error';
import './duration.css';

export default function DurationForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const compDuration = useSelector(
    (state) => state.generalState.selectedComputedDuration
  );
  const stateLogin = useSelector(
    (state) => state.generalState.login
  );
  const error = useSelector(
    (state) => state.generalState.error
  );

  const [compDurationForm, setcompDurationForm] =
    useState(compDuration);

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
    dispatch(
      setSelectedComputeDuration({
        _id: 0,
        code: '',
        description: '',
        factor: 0,
        isDefault: false,
        isEnabled: true,
        updatedBy: null,
        updatedAt: null,
        createdBy: null,
        creaatedAt: null
      })
    );
  };

  const handleOnChange = (e) => {
    setcompDurationForm({
      ...compDurationForm,
      [e.target.name]:
        e.target.name === 'factor'
          ? e.target.value === ''
            ? '0'
            : e.target.value
          : e.target.value
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (compDurationForm._id === 0) {
      // INSERT
      compDurationForm.createdBy = stateLogin.id;
      dispatch(
        insertSelectedComputeDuration(
          history,
          compDurationForm
        )
      );
    } else {
      // UPDATE
      compDurationForm.updatedBy = stateLogin.id;
      dispatch(
        updateComputeDuration(history, compDurationForm)
      );
    }
    // clear
    clearObj();
  };

  return (
    <>
      {error && <ErrorCmp err={error} />}
      <div className='card shadow-lg'>
        <h5 className='card-header'>
          Duration Form
          <div className='float-right'>
            &nbsp;&nbsp;{' '}
            <span className='text-muted'>ID:</span>
            &nbsp;{compDurationForm.id}
          </div>
        </h5>
        <div className='card-body'>
          <form onSubmit={handleOnSubmit}>
            <div className='form-row'>
              <div className='form-group col-md-2'>
                <label htmlFor='code'>Code*</label>
                <input
                  type='text'
                  className='form-control form-control-sm'
                  id='code'
                  name='code'
                  value={compDurationForm.code}
                  onChange={handleOnChange}
                  maxLength='100'
                  required
                />
              </div>
              <div className='form-group col-md-4'>
                <label htmlFor='description'>
                  Description*
                </label>
                <input
                  type='text'
                  className='form-control form-control-sm'
                  id='description'
                  name='description'
                  value={compDurationForm.description}
                  onChange={handleOnChange}
                  required
                />
              </div>
              <div className='form-group col-md-2'>
                <label htmlFor='factor'>Factor*</label>
                <input
                  type='number'
                  className='form-control form-control-sm'
                  id='factor'
                  name='factor'
                  value={compDurationForm.factor}
                  onChange={handleOnChange}
                  min='0'
                  step='.01'
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
