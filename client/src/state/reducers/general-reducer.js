import {
  USER_LOGIN,
  USER_LOGIN_RESET,
  USER_SESSION_SET,
  COMPUTED_DURATION_DEFAULT,
  COMPUTED_DURATION_FETCH,
  COMPUTED_DURATION_UPDATE,
  COMPUTED_DURATION_ERROR,
  SELECTED_COMPUTED_DURATION,
  STATE_FETCH,
  PRIORITY_FETCH,
  SIDEBAR_STATE,
  GENERAL_ERROR,
  COMPUTED_DURATION_INSERT,
  COMPUTED_DURATION_DELETE
} from '../actions/general-action';

const initialState = {
  login: null,
  states: [],
  priorities: [],
  sideBar: 'active',
  computeDurations: [],
  defaultComputedDuration: {
    code: '',
    description: '',
    factor: 0,
    isDefault: '',
    isEnabled: ''
  },
  selectedComputedDuration: {
    id: 0,
    code: '',
    description: '',
    factor: 0,
    isDefault: false,
    isEnabled: true
  },
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
    case COMPUTED_DURATION_DEFAULT:
      return {
        ...state,
        defaultComputedDuration: action.payload
      };
    case COMPUTED_DURATION_FETCH:
      return {
        ...state,
        computeDurations: action.payload
      };
    case COMPUTED_DURATION_INSERT:
      return {
        ...state,
        error: null
      };
    case COMPUTED_DURATION_DELETE:
      return {
        ...state,
        computeDurations: state.computeDurations.filter((dur) => {
          return dur.id !== action.payload && dur.isEnabled === true;
        }),
        error: null
      };
    case COMPUTED_DURATION_UPDATE:
      return {
        ...state,
        error: null
      };
    case SELECTED_COMPUTED_DURATION:
      return {
        ...state,
        selectedComputedDuration: action.payload
      };
    case USER_LOGIN_RESET:
      return {
        ...state,
        login: null,
        computeDurations: initialState.computeDurations,
        defaultComputedDuration: initialState.defaultComputedDuration,
        selectedComputedDuration: initialState.selectedComputedDuration,
        states: initialState.states,
        priorities: initialState.priorities
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
    case GENERAL_ERROR: case COMPUTED_DURATION_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}
