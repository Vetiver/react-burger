
export const SET_USER_INFO = "SET_USER_INFO";
export const SET_USER_SUCCESS = "SET_USER_SUCCESS";
export const SET_USER_FAILED = "SET_USER_FAILED";
export const CLEAN_USER_INFO = "CLEAN_USER_INFO";
export const USER_LOGIN = "USER_LOGIN";
export const FETCH_AUTH_REQUEST = "FETCH_AUTH_REQUEST";
export const FETCH_AUTH_ERROR = "FETCH_AUTH_ERROR";
export const USER_LOGOUT = "USER_LOGOUT";
export const FETCH_USER = "FETCH_USER";



const initialState = {
    userInfo: [],
    userInfoData: { name: "", email: "" },
    isLogin: false,
    isOpen: false,
    modalInfo: NaN,
    isLoading: false,
    hasError: false,
  };

  export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_USER:
        return {
          ...state,
          userInfoData: { name: action.payload.user.name, email: action.payload.user.email },
  
        };
      case SET_USER_SUCCESS:
        return {
          ...state,
          userInfo: action.payload,
        };
      case SET_USER_FAILED:
        return {
          ...state,
          userInfoFaile: true,
        };
      case CLEAN_USER_INFO:
        return {
          ...state,
          userInfo: null,
        };
      case USER_LOGIN:
        return {
          ...state,
          isLogin: true,
        };
      case FETCH_AUTH_REQUEST:
        return {
          ...state,
          isLoading: true,
        };
      case FETCH_AUTH_ERROR:
        return {
          ...state,
          isLoading: false,
          hasError: true,
        };
      case USER_LOGOUT:
        return {
          ...state,
          isLogin: false,
          userInfo: initialState.userInfo,
          isLoading: false,
        };
      default:
        return state;
    }
  };
  