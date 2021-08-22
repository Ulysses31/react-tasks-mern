import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getValidatedUserInfo } from '../../../shared/shared';
import { setUserBySession } from '../../../state/actions/general-action';
import {
  insertComment,
  updateComment,
  setSelectedComment
} from '../../../state/actions/task-action';
import './comment.css';
import ErrorCmp from '../../error/error';

export default function CommentForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const error = useSelector(
    (state) => state.taskState.error
  );
  const curComment = useSelector(
    (state) => state.taskState.selectedComment
  );
  const curTask = useSelector(
    (state) => state.taskState.taskById
  );
  const stateLogin = useSelector(
    (state) => state.generalState.login
  );

  const [commentForm, setCommentForm] =
    useState(curComment);

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
      setSelectedComment({
        _id: 0,
        description: '',
        task: '',
        user: '',
        isEnabled: true,
        createdBy: null,
        updatedAt: null,
        updatedBy: null
      })
    );
  };

  const handleOnChange = (e) => {
    setCommentForm({
      ...commentForm,
      [e.target.name]: e.target.value
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    // console.log(taskForm);

    if (curComment._id === 0) {
      // INSERT
      // console.log('INSERT');
      commentForm.task = curTask._id; // task id comment belongs.
      commentForm.user = stateLogin.id; // logged in user
      commentForm.createdBy = stateLogin.id; // logged in user
      dispatch(insertComment(history, commentForm));
    } else {
      // UPDATE
      // console.log('UPDATE');
      commentForm.updatedBy = stateLogin.id; // logged in user
      dispatch(updateComment(history, commentForm));
    }

    // clear
    clearObj();
  };

  return (
    <>
      {error && <ErrorCmp err={error} />}
      <div className='card shadow-lg'>
        <h5 className='card-header'>
          <i className='bi bi-chat-right-text'></i> Comment
          Form
        </h5>
        <div className='card-body'>
          <form onSubmit={handleOnSubmit}>
            <div className='form-row'>
              <div className='form-group col-md-12'>
                <label htmlFor='description'>
                  Comment*
                </label>
                <textarea
                  className='form-control form-control-sm'
                  id='description'
                  name='description'
                  value={commentForm.description}
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
