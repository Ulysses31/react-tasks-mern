import {
  TASK_ACTIVE_COUNT,
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
  TASK_RESET_STATE,
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
  activeTasks: 0,
  tasks: [],
  taskById: null, // the details task page
  selectedTask: {
    _id: 0,
    taskName: '',
    description: '',
    startDate: new Date(),
    endDate: null,
    duration: 0,
    isEnabled: true,
    state: '',
    priority: '',
    assignedTo: '',
    project: 0,
    createdBy: null,
    updatedAt: null,
    updatedBy: null
  },
  selectedComment: {
    // selected comment for new - edit
    _id: 0,
    description: '',
    task: '',
    user: '',
    isEnabled: true,
    createdBy: null,
    updatedAt: null,
    updatedBy: null
  },
  selectedSubTask: {
    // selected subt task for new - edit
    _id: 0,
    subTaskName: '',
    description: '',
    startDate: new Date(),
    startTime: null,
    duration: 0,
    computedDuration: 0,
    durationUnit: 0,
    task: null,
    isEnabled: true,
    guid: '',
    createdBy: null,
    updatedAt: null,
    updatedBy: null
  },
  filters: {
    project: '',
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    duration: 0,
    priority: '0',
    state: '0',
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
    case TASK_ACTIVE_COUNT:
      return {
        ...state,
        activeTasks: action.payload
      };
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
    case TASK_FETCH:
    case TASK_USER_FETCH:
      return {
        ...state,
        tasks: action.payload,
        selectedTask: {
          _id: 0,
          taskName: '',
          description: '',
          startDate: new Date(),
          endDate: null,
          duration: 0,
          isEnabled: true,
          state: '',
          priority: '',
          assignedTo: '',
          project: 0,
          createdBy: null,
          updatedAt: null,
          updatedBy: null
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
    case TASK_RESET_STATE:
      return initialState;
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
