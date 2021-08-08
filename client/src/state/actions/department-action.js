import axios from 'axios';
import { toast } from 'react-toastify';
import { apiDomain } from '../../shared/globals';

export const DEPARTMENT_FILTERS = 'DEPARTMENT_FILTERS';
export const DEPARTMENT_FETCH = 'DEPARTMENT_FETCH';
export const DEPARTMENT_USER_FETCH = 'DEPARTMENT_USER_FETCH';
export const DEPARTMENT_INSERT = 'DEPARTMENT_INSERT';
export const DEPARTMENT_DELETE = 'DEPARTMENT_DELETE';
export const DEPARTMENT_DEACTIVATE = 'DEPARTMENT_DEACTIVATE';
export const DEPARTMENT_UPDATE = 'DEPARTMENT_UPDATE';
export const DEPARTMENT_ERROR = 'DEPARTMENT_ERROR';
export const SELECTED_DEPARTMENT = 'SELECTED_DEPARTMENT';
export const DEPARTMENT_RESET_STATE = 'DEPARTMENT_RESET_STATE';

const apiUrl = `${apiDomain}/api/departments`;

const options = {
  headers: { 'content-type': 'application/json' },
  withCredentials: false,
  responseType: 'json'
};

export function fetchDepartments() {
  console.log('fetchDepartments fetched...');
  return (dispatch) => {
    return axios
      .get(apiUrl)
      .then((response) => {
        // console.log(response);
        dispatch({
          type: DEPARTMENT_FETCH,
          payload: response.data
        });
      })
      .catch((err) => {
        // console.log(err.response);
        dispatch({
          type: DEPARTMENT_ERROR,
          payload: err.response
        });
      });
  };
}

export function fetchDepartmentByUser(usr) {
  console.log('fetchDepartmentByUser fetched...');
  return (dispatch) => {
    return axios
      .get(`${apiUrlDepartmentUser}/${usr}`)
      .then((response) => {
        // console.log(response);
        dispatch({
          type: DEPARTMENT_USER_FETCH,
          payload: response.data
        });
      })
      .catch((err) => {
        // console.log(err.response);
        dispatch({
          type: DEPARTMENT_ERROR,
          payload: err.response
        });
      });
  };
}

export function insertDepartment(hst, dprt) {
  return (dispatch) => {
    return axios
      .post(apiUrl, dprt, options)
      .then((response) => {
        // console.log(response);
        dispatch({
          type: DEPARTMENT_INSERT,
          payload: dprt
        });
        // if success toast it and redirect to projects
        toast.info(`Department successfully inserted!`);
        hst.goBack();
      })
      .catch((err) => {
        // console.log(err.response);
        dispatch({
          type: DEPARTMENT_ERROR,
          payload: err.response
        });
      });
  };
}

export function updateDepartment(hst, dprt) {
  return (dispatch) => {
    return axios
      .put(`${apiUrl}/${dprt.id}`, dprt, options)
      .then((response) => {
        // console.log(response);
        dispatch({
          type: DEPARTMENT_UPDATE,
          payload: dprt
        });
        // if success toast it and redirect to projects
        toast.info(`Department successfully updated!`);
        hst.goBack();
      })
      .catch((err) => {
        // console.log(err.response);
        dispatch({
          type: DEPARTMENT_ERROR,
          payload: err.response
        });
      });
  };
}

export function deleteDepartment(id) {
  return (dispatch) => {
    return axios
      .delete(`${apiUrl}/${id}`)
      .then((response) => {
        // console.log(response);
        dispatch({
          type: DEPARTMENT_DELETE,
          payload: id
        });
        // if success toast it
        toast.info('Department successfully deleted!');
      })
      .catch((err) => {
        // console.log(err.response);
        dispatch({
          type: DEPARTMENT_ERROR,
          payload: err.response
        });
      });
  };
}

export function deactivateDepartment(id) {
  return (dispatch) => {
    return axios
      .post(`${apiUrl}/Deactivate/${id}`)
      .then((response) => {
        // console.log(response);
        dispatch({
          type: DEPARTMENT_DEACTIVATE,
          payload: id
        });
        // if success toast it
        toast.info('Department successfully deleted!');
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: DEPARTMENT_ERROR,
          payload: err.response
        });
      });
  };
}

export function setSelectedDepartment(dprt) {
  return (dispatch) => {
    dispatch({
      type: SELECTED_DEPARTMENT,
      payload: dprt
    });
  };
}

export function setDepartmentInitialState() {
  console.log('setDepartmentInitialState fetched...');
  return (dispatch) => {
    dispatch({
      type: DEPARTMENT_RESET_STATE
    });
  };
};
