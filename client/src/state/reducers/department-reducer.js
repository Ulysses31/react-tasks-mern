import {
  DEPARTMENT_FILTERS,
  DEPARTMENT_FETCH,
  DEPARTMENT_USER_FETCH,
  DEPARTMENT_INSERT,
  DEPARTMENT_UPDATE,
  DEPARTMENT_DELETE,
  DEPARTMENT_DEACTIVATE,
  DEPARTMENT_ERROR,
  SELECTED_DEPARTMENT,
  DEPARTMENT_RESET_STATE
} from '../actions/department-action';

const initialState = {
  departments: [],
  selectedDepartment: {
    _id: 0,
    name: '',
    description: '',
    isEnabled: true
  },
  error: null
};

export default function departmentReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case DEPARTMENT_FILTERS:
      return {
        ...state,
        departments: action.payload
      };
    case DEPARTMENT_FETCH:
    case DEPARTMENT_USER_FETCH:
      return {
        ...state,
        departments: action.payload,
        selectedDepartment: {
          _id: 0,
          name: '',
          description: '',
          isEnabled: true
        },
        error: null
      };
    case DEPARTMENT_INSERT:
      return {
        ...state,
        error: null
      };
    case DEPARTMENT_UPDATE:
      return {
        ...state,
        error: null
      };
    case DEPARTMENT_DELETE:
      return {
        ...state,
        departments: state.departments.filter((dprt) => {
          return dprt._id !== action.payload;
        }),
        error: null
      };
    case DEPARTMENT_DEACTIVATE:
      return {
        ...state,
        departments: state.departments.filter((dprt) => {
          return (
            dprt._id !== action.payload &&
            dprt.isEnabled === true
          );
        }),
        error: null
      };
    case DEPARTMENT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case SELECTED_DEPARTMENT:
      return {
        ...state,
        selectedDepartment: action.payload,
        error: null
      };
    case DEPARTMENT_RESET_STATE:
      return initialState;
    default:
      return state;
  }
}
