import {
  USER_LOGIN,
  USER_LOGIN_RESET,
  USER_SESSION_SET,
  STATE_FETCH,
  PRIORITY_FETCH,
  SIDEBAR_STATE,
  GENERAL_ERROR
} from '../actions/general-action';

const initialState = {
  login: null,
  states: [],
  priorities: [],
  sideBar: 'active',
  error: null
};

export default function generalReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case USER_LOGIN: case USER_SESSION_SET:
      return {
        ...state,
        login: action.payload,
        error: null
      };
    case USER_LOGIN_RESET:
      return {
        ...state,
        login: null
      };
    case STATE_FETCH:
      return {
        ...state,
        states: action.payload
      };
    case PRIORITY_FETCH:
      return {
        ...state,
        priorities: action.payload
      };
    case SIDEBAR_STATE:
      return {
        ...state,
        sideBar: action.payload
      };
    case GENERAL_ERROR:
      return {
        ...state,
        login: null,
        error: action.payload
      };
    default:
      return state;
  }
}
