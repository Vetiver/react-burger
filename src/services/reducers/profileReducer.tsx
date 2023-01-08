import { TUser } from "../../utils/types";
export const SET_USER_INFO = "SET_USER_INFO";
export const SET_USER_SUCCESS = "SET_USER_SUCCESS";
export const SET_USER_FAILED = "SET_USER_FAILED";
export const CLEAN_USER_INFO = "CLEAN_USER_INFO";
export const USER_LOGIN = "USER_LOGIN";
export const FETCH_AUTH_REQUEST = "FETCH_AUTH_REQUEST";
export const FETCH_AUTH_ERROR = "FETCH_AUTH_ERROR";
export const USER_LOGOUT = "USER_LOGOUT";
export const FETCH_USER = "FETCH_USER";

type TProfileState = {
  userInfo: ReadonlyArray<TUser> | null;
  
  userInfoData: {
    name: string;
    email: string;
  };
  isLogin: boolean;
  isOpen: boolean;
  isLoading: boolean;
  hasError: boolean;
};

const initialState = {
  userInfo: [],
  userInfoData: { name: "", email: "" },
  isLogin: false,
  isOpen: false,
  isLoading: false,
  hasError: false,
};

export interface ISetUserInfo {
  readonly type: typeof SET_USER_INFO;
}

export interface ISetUserSuccess {
  readonly type: typeof SET_USER_SUCCESS;
  payload: ReadonlyArray<TUser>;
}

export interface ISetUserFailed {
  readonly type: typeof  SET_USER_FAILED;
}

export interface ICleanUserInfo {
  readonly type: typeof CLEAN_USER_INFO;
}

export interface IUserLogin {
  readonly type: typeof USER_LOGIN;
}

export interface IFetchAuthRequest {
  readonly type: typeof FETCH_AUTH_REQUEST;
}

export interface IFetchAuthFailed {
  readonly type: typeof FETCH_AUTH_ERROR;
}

export interface IUserLogout {
  readonly type: typeof USER_LOGOUT;
}

export interface IFetchUser {
  readonly type: typeof FETCH_USER;
  payload: any;
}

type TOrderActions =
ISetUserInfo
  | ISetUserSuccess
  | ISetUserFailed
  | ICleanUserInfo
  | IUserLogin
  | IFetchAuthRequest 
  | IFetchAuthFailed
  | IUserLogout 
  | IFetchUser 

export const profileReducer = (state = initialState, action: TOrderActions): TProfileState => {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        userInfoData: {
          name: action.payload.user.name,
          email: action.payload.user.email,
        },
      };
    case SET_USER_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
      };
    case SET_USER_FAILED:
      return {
        ...state,
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
