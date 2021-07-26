import axios from 'axios';
import { toast } from 'react-toastify';

export const TASK_USER_FETCH = 'TASK_USER_FETCH';
export const TASK_FILTERS = 'TASK_FILTERS';
export const TASK_FETCH = 'TASK_FETCH';
export const TASK_FETCH_ID = 'TASK_FETCH_ID';
export const TASK_INSERT = 'TASK_INSERT';
export const TASK_DELETE = 'TASK_DELETE';
export const TASK_DEACTIVATE = 'TASK_DEACTIVATE';
export const TASK_UPDATE = 'TASK_UPDATE';
export const TASK_ERROR = 'TASK_ERROR';
export const TASK_ISLOADING = 'TASK_ISLOADING';
export const SELECTED_TASK = 'SELECTED_TASK';
export const COMMENT_INSERT = 'COMMENT_INSERT';
export const COMMENT_UPDATE = 'COMMENT_UPDATE';
export const COMMENT_DELETE = 'COMMENT_DELETE';
export const COMMENT_DEACTIVATE = 'COMMENT_DEACTIVATE';
export const SELECTED_COMMENT = 'SELECTED_COMMENT';
export const SUBTASK_INSERT = 'SUBTASK_INSERT';
export const SUBTASK_UPDATE = 'SUBTASK_UPDATE';
export const SUBTASK_DELETE = 'SUBTASK_DELETE';
export const SUBTASK_DEACTIVATE = 'SUBTASK_DEACTIVATE';
export const SELECTED_SUBTASK = 'SELECTED_SUBTASK';

const apiUrl = 'http://localhost:3001/api/tasks';
const apiUrlComments = 'http://localhost:3001/api/comments';
const apiUrlSubTasks = 'http://localhost:3001/api/subtasks';
const apiUrlTaskUser =
  'http://localhost:3001/api/tasks/byuser';
// const apiUrl = 'http://orbiesapi.dev.gr/api/tasks';
// const apiUrlComments = 'http://orbiesapi.dev.gr/api/comments';
// const apiUrlSubTasks = 'http://orbiesapi.dev.gr/api/subtasks';
// const apiUrlTaskUser = 'http://orbiesapi.dev.gr/api/tasks/byuser';

const options = {
  headers: { 'content-type': 'application/json' },
  withCredentials: false,
  responseType: 'json'
};

/*******************************************************
 *  TASKS
 ******************************************************/
export function fetchTasks() {
  console.log('fetchTasks fetched...');
  return (dispatch) => {
    dispatch({
      type: TASK_ISLOADING,
      payload: true
    });
    return axios
      .get(apiUrl)
      .then((response) => {
        // console.log(response);
        dispatch({
          type: TASK_FETCH,
          payload: response.data
        });
        dispatch({
          type: 'TASK_ISLOADING',
          payload: false
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: TASK_ERROR,
          payload: err.response
        });
      });
  };
}

export function fetchTaskById(id) {
  console.log('fetchTaskById fetched...');
  return (dispatch) => {
    dispatch({
      type: TASK_ISLOADING,
      payload: true
    });
    return axios
      .get(`${apiUrl}/${id}`)
      .then((response) => {
        // console.log(response);
        dispatch({
          type: TASK_FETCH_ID,
          payload: response.data
        });
        dispatch({
          type: 'TASK_ISLOADING',
          payload: false
        });
      })
      .catch((err) => {
        // console.log(err.response);
        dispatch({
          type: TASK_ERROR,
          payload: err.response
        });
      });
  };
}

export function fetchTaskByUser(usr) {
  console.log('fetchTaskByUser fetched...');
  return (dispatch) => {
    dispatch({
      type: TASK_ISLOADING,
      payload: true
    });
    return axios
      .get(`${apiUrlTaskUser}/${usr}`)
      .then((response) => {
        // console.log(response);
        dispatch({
          type: TASK_USER_FETCH,
          payload: response.data
        });
        dispatch({
          type: TASK_ISLOADING,
          payload: false
        });
      })
      .catch((err) => {
        // console.log(err.response);
        dispatch({
          type: TASK_ERROR,
          payload: err.response
        });
      });
  };
}

export function insertTask(hst, tsk) {
  return (dispatch) => {
    return axios
      .post(apiUrl, tsk, options)
      .then((response) => {
        // console.log(response);
        dispatch({
          type: TASK_INSERT,
          payload: tsk
        });
        // if success toast it and redirect to projects
        toast.info(`Task successfully inserted!`);
        hst.goBack();
      })
      .catch((err) => {
        // console.log(err.response);
        dispatch({
          type: TASK_ERROR,
          payload: err.response
        });
      });
  };
}

export function updateTask(hst, tsk) {
  return (dispatch) => {
    return axios
      .put(`${apiUrl}/${tsk.id}`, tsk, options)
      .then((response) => {
        // console.log(response);
        dispatch({
          type: TASK_UPDATE,
          payload: tsk
        });
        // if success toast it and redirect to projects
        toast.info(`Task successfully updated!`);
        hst.goBack();
      })
      .catch((err) => {
        // console.log(err.response);
        dispatch({
          type: TASK_ERROR,
          payload: err.response
        });
      });
  };
}

export function updateTaskDuration(tsk) {
  return (dispatch) => {
    return axios
      .put(`${apiUrl}/${tsk.id}`, tsk, options)
      .then((response) => {
        // console.log(response);
        dispatch({
          type: TASK_UPDATE,
          payload: tsk
        });
        // if success toast it and redirect to projects
        toast.info(`Task successfully updated!`);
      })
      .catch((err) => {
        // console.log(err.response);
        dispatch({
          type: TASK_ERROR,
          payload: err.response
        });
      });
  };
}

export function deleteTask(hst, id) {
  return (dispatch) => {
    return axios
      .delete(`${apiUrl}/${id}`)
      .then((response) => {
        // console.log(response);
        dispatch({
          type: TASK_DELETE,
          payload: id
        });
        // if success toast it
        toast.info('Task successfully deleted!');
        hst.push('/tasks');
      })
      .catch((err) => {
        // console.log(err.response);
        dispatch({
          type: TASK_ERROR,
          payload: err.response
        });
      });
  };
}

export function deactivateTask(hst, id) {
  return (dispatch) => {
    return axios
      .post(`${apiUrl}/Deactivate/${id}`)
      .then((response) => {
        // console.log(response);
        dispatch({
          type: TASK_DEACTIVATE,
          payload: id
        });
        // if success toast it
        toast.info('Task successfully deleted!');
        hst.push('/tasks');
      })
      .catch((err) => {
        // console.log(err.response);
        dispatch({
          type: TASK_ERROR,
          payload: err.response
        });
      });
  };
}

export function setSelectedTask(tsk) {
  return (dispatch) => {
    dispatch({
      type: SELECTED_TASK,
      payload: tsk
    });
  };
}

export function setTaskFilters(filters) {
  console.log('setTaskFilters fetched...');
  return (dispatch) => {
    dispatch({
      type: TASK_FILTERS,
      payload: filters
    });
  };
}

/*******************************************************
 *  COMMENTS
 ******************************************************/
export function insertComment(hst, cmn) {
  return (dispatch) => {
    return axios
      .post(apiUrlComments, cmn, options)
      .then((response) => {
        // console.log(response);
        dispatch({
          type: COMMENT_INSERT,
          payload: cmn
        });
        // if success toast it and redirect to projects
        toast.info(`Comment successfully inserted!`);
        hst.goBack();
      })
      .catch((err) => {
        // console.log(err.response);
        dispatch({
          type: TASK_ERROR,
          payload: err.response
        });
      });
  };
}

export function updateComment(hst, cmn) {
  return (dispatch) => {
    return axios
      .put(`${apiUrlComments}/${cmn.id}`, cmn, options)
      .then((response) => {
        // console.log(response);
        dispatch({
          type: COMMENT_UPDATE,
          payload: cmn
        });
        // if success toast it and redirect to projects
        toast.info(`Comment successfully updated!`);
        hst.goBack();
      })
      .catch((err) => {
        // console.log(err.response);
        dispatch({
          type: TASK_ERROR,
          payload: err.response
        });
      });
  };
}

export function deleteComment(id) {
  return (dispatch) => {
    return axios
      .delete(`${apiUrlComments}/${id}`)
      .then((response) => {
        // console.log(response);
        dispatch({
          type: COMMENT_DELETE
        });
        // if success toast it
        toast.info('Comment successfully deleted!');
      })
      .catch((err) => {
        // console.log(err.response);
        dispatch({
          type: TASK_ERROR,
          payload: err.response
        });
      });
  };
}

export function deactivateComment(id) {
  return (dispatch) => {
    return axios
      .post(`${apiUrlComments}/deactivate/${id}`)
      .then((response) => {
        // console.log(response);
        dispatch({
          type: COMMENT_DEACTIVATE
        });
        // if success toast it
        toast.info('Comment successfully deleted!');
      })
      .catch((err) => {
        // console.log(err.response);
        dispatch({
          type: TASK_ERROR,
          payload: err.response
        });
      });
  };
}

export function setSelectedComment(cmn) {
  return (dispatch) => {
    dispatch({
      type: SELECTED_COMMENT,
      payload: cmn
    });
  };
}

/*******************************************************
 *  SUBTASKS
 ******************************************************/
export function insertSubTask(hst, sbt) {
  return (dispatch) => {
    return axios
      .post(apiUrlSubTasks, sbt, options)
      .then((response) => {
        // console.log(response);
        dispatch({
          type: SUBTASK_INSERT,
          payload: sbt
        });
        // if success toast it and redirect to task details
        toast.info(`SubTask successfully inserted!`);
        hst.goBack();
      })
      .catch((err) => {
        // console.log(err.response);
        dispatch({
          type: TASK_ERROR,
          payload: err.response
        });
      });
  };
}

export function updateSubTask(hst, sbt) {
  return (dispatch) => {
    return axios
      .put(`${apiUrlSubTasks}/${sbt.id}`, sbt, options)
      .then((response) => {
        // console.log(response);
        dispatch({
          type: SUBTASK_UPDATE,
          payload: sbt
        });
        // if success toast it and redirect to task details
        toast.info(`SubTask successfully updated!`);
        hst.goBack();
      })
      .catch((err) => {
        // console.log(err.response);
        dispatch({
          type: TASK_ERROR,
          payload: err.response
        });
      });
  };
}

export function deleteSubTask(id) {
  return (dispatch) => {
    return axios
      .delete(`${apiUrlSubTasks}/${id}`)
      .then((response) => {
        // console.log(response);
        dispatch({
          type: SUBTASK_DELETE
        });
        // if success toast it
        toast.info('SubTask successfully deleted!');
      })
      .catch((err) => {
        // console.log(err.response);
        dispatch({
          type: TASK_ERROR,
          payload: err.response
        });
      });
  };
}

export function deactivateSubTask(id) {
  return (dispatch) => {
    return axios
      .post(`${apiUrlSubTasks}/Deactivate/${id}`)
      .then((response) => {
        // console.log(response);
        dispatch({
          type: SUBTASK_DEACTIVATE
        });
        // if success toast it
        toast.info('SubTask successfully deleted!');
      })
      .catch((err) => {
        // console.log(err.response);
        dispatch({
          type: TASK_ERROR,
          payload: err.response
        });
      });
  };
}

export function setSelectedSubTask(sbt) {
  return (dispatch) => {
    dispatch({
      type: SELECTED_SUBTASK,
      payload: sbt
    });
  };
}
