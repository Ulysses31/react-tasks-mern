import axios from 'axios';
import { toast } from 'react-toastify';
import { apiDomain } from '../../shared/globals';

export const ROLE_FETCH = 'ROLE_FETCH';
export const USER_FILTERS = 'USER_FILTERS';
export const USER_FETCH = 'USER_FETCH';
export const USER_INSERT = 'USER_INSERT';
export const USER_DELETE = 'USER_DELETE';
export const USER_UPDATE = 'USER_UPDATE';
export const USER_ERROR = 'USER_ERROR';
export const USER_ISLOADING = 'USER_ISLOADING';
export const SELECTED_USER = 'SELECTED_USER';
export const USER_RESET_STATE = 'USER_RESET_STATE';

let apiUrl = null;
let apiUrlRoles = null;

if (process.env.NODE_ENV === 'production') {
  apiUrl = '/api/user';
  apiUrlRoles = '/api/userrole';
} else {
  apiUrl = `${apiDomain}/api/user`;
  apiUrlRoles = `${apiDomain}/api/userrole`;
}

const options = {
  headers: { 'content-type': 'application/json' },
  withCredentials: false,
  responseType: 'json'
};

export function fetchUsers() {
  console.log('fetchUsers fetched...');
  return (dispatch) => {
    dispatch({
      type: USER_ISLOADING,
      payload: true
    });
    return axios
      .get(apiUrl)
      .then((response) => {
        // console.log(response);
        dispatch({
          type: USER_FETCH,
          payload: response.data
        });
        dispatch({
          type: USER_ISLOADING,
          payload: false
        });
      })
      .catch((err) => {
        // console.log(err.response);
        dispatch({
          type: USER_ERROR,
          payload: err.response
        });
      });
  };
}

export function fetchRoles() {
  console.log('fetchRoles fetched...');
  return (dispatch) => {
    return axios
      .get(apiUrlRoles)
      .then((response) => {
        // console.log(response);
        dispatch({
          type: ROLE_FETCH,
          payload: response.data
        });
      })
      .catch((err) => {
        // console.log(err.response);
        dispatch({
          type: USER_ERROR,
          payload: err.response
        });
      });
  };
}

export function insertUser(hst, usr) {
  return (dispatch) => {
    return axios
      .post(apiUrl, usr, options)
      .then((response) => {
        // console.log(response);
        dispatch({
          type: USER_INSERT,
          payload: usr
        });
        // if success toast it and redirect to projects
        toast.info(`User successfully inserted!`);
        hst.goBack();
      })
      .catch((err) => {
        // console.log(err.response);
        dispatch({
          type: USER_ERROR,
          payload: err.response
        });
      });
  };
}

export function updateUser(hst, usr) {
  return (dispatch) => {
    return axios
      .put(`${apiUrl}/${usr._id}`, usr)
      .then((response) => {
        // console.log(response);
        dispatch({
          type: USER_UPDATE,
          payload: usr
        });
        // if success toast it and redirect to projects
        toast.info(`User successfully updated!`);
        hst.goBack();
      })
      .catch((err) => {
        // console.log(err.response);
        dispatch({
          type: USER_ERROR,
          payload: err.response
        });
      });
  };
}

export function deleteUser(id) {
  return (dispatch) => {
    return axios
      .delete(`${apiUrl}/${id}`)
      .then((response) => {
        // console.log(response);
        dispatch({
          type: USER_DELETE,
          payload: id
        });
        // if success toast it
        toast.info('User successfully deleted!');
      })
      .catch((err) => {
        // console.log(err.response);
        dispatch({
          type: USER_ERROR,
          payload: err.response
        });
      });
  };
}

export function setSelectedUser(usr) {
  return (dispatch) => {
    dispatch({
      type: SELECTED_USER,
      payload: usr
    });
  };
}

export function setUserFilters(filters) {
  console.log('setUserFilters fetched...');
  return (dispatch) => {
    dispatch({
      type: USER_FILTERS,
      payload: filters
    });
  };
}

export function setUserInitialState() {
  console.log('setUserInitialState fetched...');
  return (dispatch) => {
    dispatch({
      type: USER_RESET_STATE
    });
  };
}
