import thunk from "redux";
import { setCookie, getCookie, deleteCookie } from "../../utils/cookie.jsx";
import checkResponse from "../../utils/checkResponse.jsx";
import { baseUrl } from "./ingredients";
import { CLEAN_USER_INFO } from "../reducers/profileReducer";
import {
  FETCH_AUTH_REQUEST,
  FETCH_AUTH_ERROR,
  FETCH_USER,
} from "../reducers/profileReducer";
import { TDispatch} from "../store/store";
import {TRequestOptions , TLoginForm, TRegisterForm, TResetPasswordForm } from "../../utils/types.js";
export const SET_USER_INFO = "SET_USER_INFO";
export const SET_USER_SUCCESS = "SET_USER_SUCCESS";
export const SET_USER_FAILED = "SET_USER_FAILED";
export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";
export const IS_OPEN = "IS_OPEN";
export const IS_CLOSE = "IS_CLOSE";
export const SET_VISIBLE = "SET_VISIBLE";
export const REMOVE_VISIBLE = "REMOVE_VISIBLE";
export const SET_ORDER = "SET_ORDER";
export const ALL_ORDERS = "ALL_ORDERS";
export const HISTORY_ORDERS = "HISTORY_ORDERS";
export const cookieLiveTime = 1140

export const logout = async () => {
  return await fetch(`${baseUrl}/api/auth/logout`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
  }).then(checkResponse);
};

export const refreshToken = async () => {
  return await fetch(`${baseUrl}/api/auth/token`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkResponse);
};

console.log(getCookie("token"));


  export const infoUserData = () => {
    const requestOptions: TRequestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie("token"),
      },
    };
    return fetch(`${baseUrl}/api/auth/user`, requestOptions).then(checkResponse);
  };


export const setUserData = (form: TLoginForm) => {
  const requestOptions: TRequestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
    body: JSON.stringify(form),
  };

  return fetch(`${baseUrl}/api/auth/user`, requestOptions).then(checkResponse);
};

export const setPassword = async (form: any) => {
  return await fetch(`${baseUrl}/api/password-reset/reset`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(form),
  }).then(checkResponse);
};

export const resetPassword = (form: TResetPasswordForm) => {
  return fetch(`${baseUrl}/api/password-reset`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(form),
  }).then(checkResponse);
};

const registerRequest = (form: TRegisterForm) => {
  return fetch(`${baseUrl}/api/auth/register`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(form),
  }).then(checkResponse);
};

const loginRequest = async (form: TLoginForm) => {
  return await fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(form),
  }).then(checkResponse);
};

export const refreshAccessToken = (): any => {
  return function () {
    refreshToken()
      .then((res) => {
        if (res && res.success) {
          deleteCookie("token");
          localStorage.setItem("refreshToken", res.refreshToken);
          const authToken = res.accessToken;
          setCookie("token", authToken, { 'max-age': cookieLiveTime });
        } else {
          console.log("tokenERROR");
        }
      })
      .catch((err) => console.log(err));
  };
}

export function setUserInfo(form: TRegisterForm) {
  return function (dispatch: TDispatch) {
    dispatch({
      type: SET_USER_INFO,
    });
    registerRequest(form)
      .then((res) => {
        if (res.success && res) {
          dispatch({
            type: SET_USER_SUCCESS,
            payload: res,
          });
          dispatch({ type: USER_LOGIN });
        } else {
          dispatch({
            type: SET_USER_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch(refreshAccessToken());
        dispatch({
          type: SET_USER_FAILED,
        });
      });
  };
}


export function getUserInfo() {
  return function (dispatch: TDispatch) {
    dispatch({
      type: SET_USER_INFO,
    });
    infoUserData()
      .then((res) => {
        if (res.success && res) {
          dispatch({ type: USER_LOGIN });
          dispatch({
            type: SET_USER_SUCCESS,
            payload: res,
          });
          dispatch({
            type: FETCH_USER,
            payload: res,
          });
        } else {
          dispatch({
            type: SET_USER_FAILED,
          });
        }
      })
      .catch((err) => {
         dispatch(refreshAccessToken());
      });
  };
}

export function setUser(form: TLoginForm) {
  return function (dispatch: TDispatch) {
    dispatch({
      type: SET_USER_INFO,
    });
    setUserData(form)
      .then((res) => {
        if (res.success && res) {
          dispatch({
            type: SET_USER_SUCCESS,
            payload: res,
          });
          dispatch({ type: USER_LOGIN });
        } else {
          dispatch({
            type: SET_USER_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: SET_USER_FAILED,
        });
      });
  };
}

export function loginUserInfo(form: TLoginForm) {
  return function (dispatch: TDispatch) {
    dispatch({
      type: SET_USER_INFO,
    });
    loginRequest(form)
      .then((res) => {
        if (res.success && res) {
          setCookie("token", res.accessToken, { 'max-age': cookieLiveTime });
          localStorage.setItem("refreshToken", res.refreshToken,);
          dispatch({
            type: SET_USER_SUCCESS,
            payload: res,
          });
          dispatch({
            type: FETCH_USER,
            payload: res,
          });
          dispatch({ type: USER_LOGIN });
        } else {
          dispatch({
            type: SET_USER_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: SET_USER_FAILED,
        });
      });
  };
}

export function clearUserInfo() {
  return function (dispatch: TDispatch) {
    dispatch({
      type: CLEAN_USER_INFO,
    });
  };
}

export function userLogin() {
  return function (dispatch: TDispatch) {
    dispatch({ type: USER_LOGIN });
  };
}
export function userLogoutFromAccount() {
  return function (dispatch: TDispatch) {
    dispatch({ type: FETCH_AUTH_REQUEST });
    logout()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: USER_LOGOUT,
          });
        } else {
          dispatch({ type: FETCH_AUTH_ERROR });
        }
      })
      .catch(() =>
        dispatch({
          type: FETCH_AUTH_ERROR,
        })
      );
  };
}
