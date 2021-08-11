import axios from 'axios';
import { toast } from 'react-toastify';
import { apiDomain } from '../../shared/globals';

export const PROJECT_ACTIVE_COUNT = 'PROJECT_ACTIVE_COUNT';
export const PROJECT_FILTERS = 'PROJECT_FILTERS';
export const PROJECT_FETCH = 'PROJECT_FETCH';
export const PROJECT_USER_FETCH = 'PROJECT_USER_FETCH';
export const PROJECT_INSERT = 'PROJECT_INSERT';
export const PROJECT_DELETE = 'PROJECT_DELETE';
export const PROJECT_DEACTIVATE = 'PROJECT_DEACTIVATE';
export const PROJECT_UPDATE = 'PROJECT_UPDATE';
export const PROJECT_ERROR = 'PROJECT_ERROR';
export const PROJECT_ISLOADING = 'PROJECT_ISLOADING';
export const SELECTED_PROJECT = 'SELECTED_PROJECT';
export const PROJECT_RESET_STATE = 'PROJECT_RESET_STATE';

const apiUrl = `${apiDomain}/api/project`;
const apiUrlProjectUser = `${apiDomain}/api/project/byuser`;

const options = {
  headers: { 'content-type': 'application/json' },
  withCredentials: false,
  responseType: 'json'
};

export function fetchProjects() {
  console.log('fetchProjects fetched...');
  return (dispatch) => {
    dispatch({
      type: PROJECT_ISLOADING,
      payload: true
    });
    return axios
      .get(apiUrl)
      .then((response) => {
        // console.log(response);
        dispatch({
          type: PROJECT_FETCH,
          payload: response.data
        });
        dispatch({
          type: PROJECT_ISLOADING,
          payload: false
        });
      })
      .catch((err) => {
        // console.log(err.response);
        dispatch({
          type: PROJECT_ERROR,
          payload: err.response
        });
      });
  };
}

export function fetchProjectsByUser(
  usr,
  curDateFrom,
  curDateTo
) {
  console.log('fetchProjectsByUser fetched...');
  return (dispatch) => {
    dispatch({
      type: PROJECT_ISLOADING,
      payload: true
    });
    return axios
      .get(
        `${apiUrlProjectUser}/${usr}/from/${curDateFrom}/to/${curDateTo}`
      )
      .then((response) => {
        // console.log(response);
        dispatch({
          type: PROJECT_USER_FETCH,
          payload: response.data
        });
        dispatch({
          type: PROJECT_ISLOADING,
          payload: false
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: PROJECT_ERROR,
          payload: err.response
        });
      });
  };
}

export function insertProject(hst, prj) {
  return (dispatch) => {
    return axios
      .post(apiUrl, prj, options)
      .then((response) => {
        // console.log(response);
        dispatch({
          type: PROJECT_INSERT,
          payload: prj
        });
        // if success toast it and redirect to projects
        toast.info(`Project successfully inserted!`);
        hst.goBack();
      })
      .catch((err) => {
        // console.log(err.response);
        dispatch({
          type: PROJECT_ERROR,
          payload: err.response
        });
      });
  };
}

export function updateProject(hst, prj) {
  return (dispatch) => {
    return axios
      .put(`${apiUrl}/${prj._id}`, prj, options)
      .then((response) => {
        // console.log(response);
        dispatch({
          type: PROJECT_UPDATE,
          payload: prj
        });
        // if success toast it and redirect to projects
        toast.info(`Project successfully updated!`);
        hst.goBack();
      })
      .catch((err) => {
        // console.log(err.response);
        dispatch({
          type: PROJECT_ERROR,
          payload: err.response
        });
      });
  };
}

export function deleteProject(id) {
  return (dispatch) => {
    return axios
      .delete(`${apiUrl}/${id}`)
      .then((response) => {
        // console.log(response);
        dispatch({
          type: PROJECT_DELETE,
          payload: id
        });
        // if success toast it
        toast.info('Project successfully deleted!');
      })
      .catch((err) => {
        // console.log(err.response);
        dispatch({
          type: PROJECT_ERROR,
          payload: err.response
        });
      });
  };
}

export function deactivateProject(id) {
  return (dispatch) => {
    return axios
      .post(`${apiUrl}/deactivate/${id}`)
      .then((response) => {
        // console.log(response);
        dispatch({
          type: PROJECT_DEACTIVATE,
          payload: id
        });
        // if success toast it
        toast.info('Project successfully deleted!');
      })
      .catch((err) => {
        // console.log(err.response);
        dispatch({
          type: PROJECT_ERROR,
          payload: err.response
        });
      });
  };
}

export function setSelectedProject(prj) {
  return (dispatch) => {
    dispatch({
      type: SELECTED_PROJECT,
      payload: prj
    });
  };
}

export function setProjectFilters(filters) {
  console.log('setProjectFilters fetched...');
  return (dispatch) => {
    dispatch({
      type: PROJECT_FILTERS,
      payload: filters
    });
  };
}

export function setProjectInitialState() {
  console.log('setProjectInitialState fetched...');
  return (dispatch) => {
    dispatch({
      type: PROJECT_RESET_STATE
    });
  };
}

export function getActiveProjects() {
  console.log('getActiveProjects fetched...');
  return (dispatch) => {
    return axios
      .get(`${apiUrl}/count`)
      .then((response) => {
        // console.log(response);
        dispatch({
          type: PROJECT_ACTIVE_COUNT,
          payload: response.data
        });
      })
      .catch((err) => {
        // console.log(err.response);
        dispatch({
          type: PROJECT_ERROR,
          payload: err.response
        });
      });
  };
}
