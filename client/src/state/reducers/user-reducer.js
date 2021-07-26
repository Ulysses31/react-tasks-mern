import {
  ROLE_FETCH,
  USER_FILTERS,
  USER_FETCH,
  USER_INSERT,
  USER_UPDATE,
  USER_DELETE,
  USER_ERROR,
  USER_ISLOADING,
  SELECTED_USER
} from '../actions/user-action';

const initialState = {
  roles: [],
  users: [],
  selectedUser: {
    id: 0,
    username: '',
    password: '',
    position: '',
    departmentId: 0,
    email: '',
    title: '',
    isEnabled: true,
    userRoleId: 1
  },
  filters: {
    title: '',
    position: '',
    department: 0,
    roleId: 0
  },
  isLoading: false,
  error: null
};

export default function userReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case USER_FILTERS:
      return {
        ...state,
        filters: action.payload
      };
    case USER_ISLOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case ROLE_FETCH:
      return {
        ...state,
        roles: action.payload
      };
    case USER_FETCH:
      return {
        ...state,
        users: action.payload,
        selectedUser: {
          id: 0,
          username: '',
          password: '',
          position: '',
          departmentId: 0,
          email: '',
          title: '',
          isEnabled: true,
          userRoleId: 1
        },
        error: null
      };
    case USER_INSERT:
      return {
        ...state,
        error: null
      };
    case USER_UPDATE:
      return {
        ...state,
        error: null
      };
    case USER_DELETE:
      return {
        ...state,
        users: state.users.filter((usr) => {
          return usr.id !== action.payload;
        }),
        error: null
      };
    case USER_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case SELECTED_USER:
      return {
        ...state,
        selectedUser: action.payload,
        error: null
      };
    default:
      return state;
  }
}
