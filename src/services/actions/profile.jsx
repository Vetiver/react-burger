import thunk from "redux";
import { setCookie, getCookie } from "../../utils/cookie.jsx";
import checkResponse from '../../utils/checkResponse.jsx';
import { CLEAN_USER_INFO } from "../reducers/orderReducer.jsx";
export const SET_USER_INFO = 'SET_USER_INFO';
export const SET_USER_SUCCESS = 'SET_USER_SUCCESS';
export const SET_USER_FAILED = 'SET_USER_FAILED';
export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';


export const logout = async form => {
  return await fetch('https://norma.nomoreparties.space/api/auth/logout', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  }).then(checkResponse);
};

export const infoUserData = () => {
  return fetch('https://norma.nomoreparties.space/api/auth/user', {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getCookie('token')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify()
  }).then(checkResponse);
};

export const setUserData = () => {
  return fetch('https://norma.nomoreparties.space/api/auth/user', {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getCookie('token')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify()
  }).then(checkResponse);
};



export const setPassword = async form => {
    return await fetch('https://norma.nomoreparties.space/api/password-reset/reset', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(form)
    }).then(checkResponse);
  };
  
  
  
export const resetPassword = form => {
    return fetch('https://norma.nomoreparties.space/api/password-reset', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(form)
    }).then(checkResponse);
  };
  
  const registerRequest = form => {
    return fetch('https://norma.nomoreparties.space/api/auth/register', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(form)
    }).then(checkResponse);
  };
  
  const loginRequest = async form => {
    return await fetch('https://norma.nomoreparties.space/api/auth/login', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
        
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(form)
    }).then(checkResponse);
  };

  

  export function setUserInfo(form) {
    return function (dispatch) {
      dispatch({
        type: SET_USER_INFO,
      });
      registerRequest(form)
      .then((res) => {
        console.log(res)
      if (res.success && res) {
        setCookie('token', res.accessToken)
        dispatch({
          type: SET_USER_SUCCESS,
          payload: res,
        });
        console.log(res)
      } else {
        dispatch({
          type: SET_USER_FAILED,
        })
      }
         
      })
      .catch ((err) => {
        console.log(err);
        dispatch({
          type: SET_USER_FAILED,
        })
      })
      
    };
  }
  
  

  export function loginUserInfo(form) {
    return function (dispatch) {
      dispatch({
        type: SET_USER_INFO,
      });
      loginRequest(form)
      .then((res) => {
        console.log(res)
        if (res.success && res) {
          setCookie('token', res.accessToken)
          dispatch({
            type: SET_USER_SUCCESS,
            payload: res,
          });
          console.log(res)
        } else {
          dispatch({
            type: SET_USER_FAILED,
          })
        }
           
        })
        .catch ((err) => {
          console.log(err);
          dispatch({
            type: SET_USER_FAILED,
          })
        })
        
      };
    }

  export function clearUserInfo() {
    return function (dispatch) {
      dispatch({
        type: CLEAN_USER_INFO,
      })
    }
  }

  export function userLogin() {
    return function (dispatch) {
      dispatch({type: USER_LOGIN})
    }
  }
  export function userLogout() {
    return function (dispatch) {
      dispatch({type: USER_LOGOUT})
    }
  } 