import axios from 'axios';
import { toast } from 'react-toastify';
import { apiDomain } from '../../shared/globals';
import { resetValidatedUserInfo } from '../../shared/shared';
import { setDepartmentInitialState } from './department-action';
import { setProjectInitialState } from './project-action';
import { setTaskInitialState } from './task-action';
import { setUserInitialState } from './user-action';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_RESET = 'USER_LOGIN_RESET';
export const USER_SESSION_SET = 'USER_SESSION_SET';
export const COMPUTED_DURATION_DEFAULT =
  'COMPUTED_DURATION_DEFAULT';
export const COMPUTED_DURATION_FETCH =
  'COMPUTED_DURATION_FETCH';
export const COMPUTED_DURATION_INSERT =
  'COMPUTED_DURATION_INSERT';
export const COMPUTED_DURATION_DELETE =
  'COMPUTED_DURATION_DELETE';
export const COMPUTED_DURATION_UPDATE =
  'COMPUTED_DURATION_UPDATE';
export const COMPUTED_DURATION_ERROR =
  'COMPUTED_DURATION_ERROR';
export const SELECTED_COMPUTED_DURATION =
  'SELECTED_COMPUTED_DURATION';
export const STATE_FETCH = 'STATE_FETCH';
export const PRIORITY_FETCH = 'PRIORITY_FETCH';
export const SIDEBAR_STATE = 'SIDEBAR_STATE';
export const GENERAL_ERROR = 'GENERAL_ERROR';

const apiStatesUrl = `${apiDomain}/api/state`;
const apicomputedDurationsUrl = `${apiDomain}/api/computeDuration`;
const apiPrioritiesUrl = `${apiDomain}/api/priority`;
const apiUrlUsers = `${apiDomain}/api/user`;

const options = {
  headers: { 'content-type': 'application/json' },
  withCredentials: false,
  responseType: 'json'
};

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

export function fetchComputeDurations() {
  console.log('fetchComputeDurations fetched...');
  return (dispatch) => {
    return axios
      .get(apicomputedDurationsUrl)
      .then((response) => {
        // console.log(response);
        dispatch({
          type: COMPUTED_DURATION_FETCH,
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
        dispatch({
          type: USER_LOGIN,
          payload: response.data
        });
        return response;
      })
      .catch((err) => {
        // console.log(err.response);
        resetValidatedUserInfo();
        dispatch({
          type: GENERAL_ERROR,
          payload: err.response.data
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
    dispatch(setTaskInitialState());
    dispatch(setUserInitialState());
    dispatch(setDepartmentInitialState());
    dispatch(setProjectInitialState());
    // reset filters on signout
    dispatch({
      type: USER_LOGIN_RESET
    });
  };
}

export function getDefaultComputedDurationById(id) {
  return (dispatch) => {
    return axios
      .get(`${apicomputedDurationsUrl}/${id}`)
      .then((response) => {
        // console.log(response);
        dispatch({
          type: COMPUTED_DURATION_DEFAULT,
          payload: response.data
        });
        return response;
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

export function setSelectedComputeDuration(dur) {
  return (dispatch) => {
    dispatch({
      type: SELECTED_COMPUTED_DURATION,
      payload: dur
    });
  };
}

export function insertSelectedComputeDuration(hst, dur) {
  return (dispatch) => {
    return axios
      .post(apicomputedDurationsUrl, dur, options)
      .then((response) => {
        console.log(response);
        dispatch({
          type: COMPUTED_DURATION_INSERT,
          payload: dur
        });
        // if success toast it and redirect to projects
        toast.info(`Duration successfully inserted!`);
        hst.goBack();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: COMPUTED_DURATION_ERROR,
          payload: err.response
        });
      });
  };
}

export function deleteComputeDuration(id) {
  return (dispatch) => {
    return axios
      .delete(`${apicomputedDurationsUrl}/${id}`)
      .then((response) => {
        // console.log(response);
        dispatch({
          type: COMPUTED_DURATION_DELETE,
          payload: id
        });
        // if success toast it
        toast.info('Duration successfully deleted!');
      })
      .catch((err) => {
        // console.log(err.response);
        dispatch({
          type: COMPUTED_DURATION_ERROR,
          payload: err.response
        });
      });
  };
}

export function updateComputeDuration(hst, dur) {
  return (dispatch) => {
    return axios
      .put(
        `${apicomputedDurationsUrl}/${dur._id}`,
        dur,
        options
      )
      .then((response) => {
        // console.log(response);
        dispatch({
          type: COMPUTED_DURATION_UPDATE,
          payload: dur
        });
        // if success toast it and redirect to projects
        toast.info(`Duration successfully updated!`);
        hst.goBack();
      })
      .catch((err) => {
        // console.log(err.response);
        dispatch({
          type: COMPUTED_DURATION_ERROR,
          payload: err.response
        });
      });
  };
}
