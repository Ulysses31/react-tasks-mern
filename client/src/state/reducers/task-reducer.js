import {
  TASK_USER_FETCH,
  TASK_FILTERS,
  TASK_FETCH,
  TASK_FETCH_ID,
  TASK_INSERT,
  TASK_UPDATE,
  TASK_DELETE,
  TASK_DEACTIVATE,
  TASK_ERROR,
  TASK_ISLOADING,
  SELECTED_TASK,
  COMMENT_INSERT,
  COMMENT_UPDATE,
  COMMENT_DELETE,
  COMMENT_DEACTIVATE,
  SELECTED_COMMENT,
  SUBTASK_INSERT,
  SUBTASK_UPDATE,
  SUBTASK_DELETE,
  SUBTASK_DEACTIVATE,
  SELECTED_SUBTASK
} from '../actions/task-action';

const initialState = {
  tasks: [],
  taskById: null, // the details task page
  selectedTask: {
    id: 0,
    taskName: '',
    description: '',
    startDate: new Date(),
    endDate: null,
    duration: 0,
    isEnabled: true,
    priorityId: 1,
    stateId: 1,
    projectId: 0
  },
  selectedComment: { // selected comment for new - edit
    id: 0,
    description: '',
    taskId: 0,
    isEnabled: true
  },
  selectedSubTask: { // selected subt task for new - edit
    id: 0,
    subTaskName: '',
    description: '',
    startDate: new Date(),
    startTime: null,
    duration: 0,
    taskId: 0,
    isEnabled: true
  },
  filters: {
    project: '',
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    duration: 0,
    priorityId: 0,
    stateId: 0,
    selectedUser: 0,
    startDateFrom: 0,
    startDateTo: 0
  },
  isLoading: false,
  error: null
};

export default function taskReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case TASK_FILTERS:
      return {
        ...state,
        filters: action.payload
      };
    case TASK_ISLOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case TASK_FETCH: case TASK_USER_FETCH:
      return {
        ...state,
        tasks: action.payload,
        selectedTask: {
          id: 0,
          taskName: '',
          description: '',
          startDate: new Date(),
          endDate: null,
          isEnabled: true,
          priorityId: 1,
          stateId: 1,
          projectId: 0
        },
        error: null
      };
    case TASK_FETCH_ID:
      return {
        ...state,
        taskById: action.payload
      };
    case TASK_INSERT:
      return {
        ...state,
        error: null
      };
    case TASK_UPDATE:
      return {
        ...state,
        error: null
      };
    case TASK_DELETE:
      return {
        ...state,
        tasks: state.tasks.filter((tsk) => {
          return tsk.id !== action.payload;
        }),
        error: null
      };
    case TASK_DEACTIVATE:
      return {
        ...state,
        tasks: state.tasks.filter((tsk) => {
          return tsk.id !== action.payload;
        }),
        error: null
      };
    case TASK_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case SELECTED_TASK:
      return {
        ...state,
        selectedTask: action.payload,
        error: null
      };
    case COMMENT_INSERT:
      return {
        ...state,
        error: null
      };
    case COMMENT_UPDATE:
      return {
        ...state,
        error: null
      };
    case COMMENT_DELETE:
      return {
        ...state,
        error: null
      };
    case COMMENT_DEACTIVATE:
      return {
        ...state,
        error: null
      };
    case SELECTED_COMMENT:
      return {
        ...state,
        selectedComment: action.payload,
        error: null
      };
    case SUBTASK_INSERT:
      return {
        ...state,
        error: null
      };
    case SUBTASK_UPDATE:
      return {
        ...state,
        error: null
      };
    case SUBTASK_DELETE:
      return {
        ...state,
        error: null
      };
    case SUBTASK_DEACTIVATE:
      return {
        ...state,
        error: null
      };
    case SELECTED_SUBTASK:
      return {
        ...state,
        selectedSubTask: action.payload,
        error: null
      };
    default:
      return state;
  }
}
