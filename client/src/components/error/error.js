import React from 'react';
import PropTypes from 'prop-types';
import './error.css';

export default function ErrorCmp({ err }) {
  // console.log(err);

  if (err.data) {
    var message = err.data;

    if (
      err.data.indexOf(
        'System.Exception: Invalid Credentials'
      ) > -1
    ) {
      message = 'Sign In failed. Invalid Credentials.';
    }

    if (
      err.data.indexOf(
        'System.Exception: Email does not exist'
      ) > -1
    ) {
      message = 'Sign In failed. Email does not exist.';
    }

    if (
      err.data.indexOf(
        'System.Exception: Email and password are required'
      ) > -1
    ) {
      message =
        'Sign In failed. Email and password are required.';
    }

    // if (err.data.indexOf('FK_SubTask_Task_TaskId') > -1) {
    if (
      err.data.indexOf(
        'Delete aborted! Task contains sub tasks.'
      ) > -1
    ) {
      message = 'Delete aborted. Task contains Sub tasks.';
    }

    // if (err.data.indexOf('FK_TaskComment_Task_TaskId') > -1) {
    if (
      err.data.indexOf(
        'Delete aborted! Task contains comments.'
      ) > -1
    ) {
      message = 'Delete aborted. Task contains comments.';
    }

    // if (err.data.indexOf('FK_Task_Project_ProjectId') > -1) {
    if (
      err.data.indexOf(
        'Delete aborted! Project contains tasks.'
      ) > -1
    ) {
      message = 'Delete aborted. Project contains tasks.';
    }
  } else {
    message = err.message;
  }

  return (
    <div>
      <div
        className='alert alert-danger alert-dismissible fade show shadow-sm'
        role='alert'
        style={{ overflow: 'auto' }}
      >
        <strong>Error!</strong> {message}
        <button
          type='button'
          className='close'
          data-dismiss='alert'
          aria-label='Close'
        >
          <span aria-hidden='true'>&times;</span>
        </button>
      </div>
    </div>
  );
}

ErrorCmp.propTypes = {
  err: PropTypes.object
};
