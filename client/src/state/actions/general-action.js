import axios from 'axios';
import { apiDomain } from '../../shared/globals';
import { resetValidatedUserInfo } from '../../shared/shared';
import { setProjectFilters } from './project-action';
import { setTaskFilters } from './task-action';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_RESET = 'USER_LOGIN_RESET';
export const USER_SESSION_SET = 'USER_SESSION_SET';
export const STATE_FETCH = 'STATE_FETCH';
export const PRIORITY_FETCH = 'PRIORITY_FETCH';
export const SIDEBAR_STATE = 'SIDEBAR_STATE';
export const GENERAL_ERROR = 'GENERAL_ERROR';

const apiStatesUrl = `${apiDomain}/api/state`;
const apiPrioritiesUrl = `${apiDomain}/api/priority`;
const apiUrlUsers = `${apiDomain}/api/user`;

export function fetchStates() {
  console.log('fetchStates fetched...');
  return (dispatch) => {
    return axios
      .get(apiStatesUrl)
      .then((response) => {
        // console.log(response);
        dispatch({
          type: STATE_FETCH,
          payload: response.data
        });
      })
      .catch((err) => {
        // console.log(err.response);
        dispatch({
          type: GENERAL_ERROR,
          payload: err.response
        });
      });
  };
}

export function fetchPriorities() {
  console.log('fetchPriorities fetched...');
  return (dispatch) => {
    return axios
      .get(apiPrioritiesUrl)
      .then((response) => {
        // console.log(response);
        dispatch({
          type: PRIORITY_FETCH,
          payload: response.data
        });
      })
      .catch((err) => {
        // console.log(err.response);
        dispatch({
          type: GENERAL_ERROR,
          payload: err.response
        });
      });
  };
}

export function changeSidebarState(state) {
  return (dispatch) => {
    dispatch({
      type: SIDEBAR_STATE,
      payload: state
    });
  };
}

export function getUserByLogin({ email, password }) {
  return (dispatch) => {
    return axios
      .post(`${apiUrlUsers}/ByLogin`, { email, password })
      .then((response) => {
        // console.log(response);
        if (response.data) {
          dispatch({
            type: USER_LOGIN,
            payload: response.data
          });
          return response;
        } else {
          resetValidatedUserInfo();
          dispatch({
            type: GENERAL_ERROR,
            payload: { message: 'Invalid Credentials' }
          });
        }
      })
      .catch((err) => {
        // console.log(err.response);
        resetValidatedUserInfo();
        dispatch({
          type: GENERAL_ERROR,
          payload: err.response
        });
      });
  };
}

export function setUserBySession(usr) {
  return (dispatch) => {
    dispatch({
      type: USER_SESSION_SET,
      payload: usr
    });
  };
}

export function resetUserByLogin() {
  return (dispatch) => {
    // reset filters on signout
    dispatch(
      setProjectFilters({
        createdFrom: '',
        createdTo: '',
        name: '',
        description: '',
        duration: 0,
        deadlineFrom: '',
        deadlineTo: '',
        priorityId: 0,
        stateId: 0,
        selectedUser: 0
      })
    );
    dispatch(
      setTaskFilters({
        project: '',
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        duration: 0,
        priorityId: 0,
        stateId: 0,
        selectedUser: 0
      })
    );
    // reset filters on signout
    dispatch({
      type: USER_LOGIN_RESET
    });
  };
}
