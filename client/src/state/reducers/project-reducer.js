import {
  PROJECT_FILTERS,
  PROJECT_FETCH,
  PROJECT_USER_FETCH,
  PROJECT_INSERT,
  PROJECT_UPDATE,
  PROJECT_DELETE,
  PROJECT_DEACTIVATE,
  PROJECT_ERROR,
  PROJECT_ISLOADING,
  SELECTED_PROJECT
} from '../actions/project-action';

const initialState = {
  projects: [],
  selectedProject: {
    id: 0,
    projectName: '',
    description: '',
    isEnabled: true,
    duration: 0,
    deadline: new Date(),
    priorityId: 1,
    stateId: 1
  },
  filters: {
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
  },
  isLoading: false,
  error: null
};

export default function projectReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case PROJECT_FILTERS:
      return {
        ...state,
        filters: action.payload
      };
    case PROJECT_ISLOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case PROJECT_FETCH: case PROJECT_USER_FETCH:
      return {
        ...state,
        projects: action.payload,
        selectedProject: {
          id: 0,
          projectName: '',
          description: '',
          isEnabled: true,
          duration: 0,
          deadline: new Date(),
          priorityId: 1,
          stateId: 1
        },
        error: null
      };
    case PROJECT_INSERT:
      return {
        ...state,
        error: null
      };
    case PROJECT_UPDATE:
      return {
        ...state,
        error: null
      };
    case PROJECT_DELETE:
      return {
        ...state,
        projects: state.projects.filter((prj) => {
          return prj.id !== action.payload;
        }),
        error: null
      };
    case PROJECT_DEACTIVATE:
      return {
        ...state,
        projects: state.projects.filter((prj) => {
          return prj.id !== action.payload && prj.isEnabled === true;
        }),
        error: null
      };
    case PROJECT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case SELECTED_PROJECT:
      return {
        ...state,
        selectedProject: action.payload,
        error: null
      };
    default:
      return state;
  }
}
