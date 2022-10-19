 import { Route } from 'react-router-dom';
 import {useDispatch, useSelector} from 'react-redux';
 import { useEffect, useState } from 'react';
 import { Redirect, useLocation} from 'react-router-dom'
 import {getUserInfo, refreshToken, USER_LOGIN} from '../../services/actions/profile.jsx';

 export function ProtectedRoute({ anonymous = false, isAuth, children, ...rest }) {
  const userInfo = useSelector(state => state.userInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(userInfo)
    if (!isAuth && document.cookie !== '') {
      console.log(']]]]]')
      refreshToken()
    }
    if(document.cookie !== '') {
      dispatch(getUserInfo())
      dispatch({type: USER_LOGIN})
    }
  }, []);

  const location = useLocation();
  if (anonymous && isAuth) {
    return <Redirect to="/" />;
  }
  
	if (!anonymous && !isAuth) {
    // ...то отправляем его, например, на форму входа
    return  <Redirect to={{ pathname: "/login", state: { from: location } }} />;
  }
	return <Route {...rest}>{children}</Route>;;
 }