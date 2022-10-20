 import { Route } from 'react-router-dom';
 import {useDispatch, useSelector} from 'react-redux';
 import { useEffect} from 'react';
 import { Redirect, useLocation} from 'react-router-dom'
 import {getUserInfo, refreshAccessToken, USER_LOGIN} from '../../services/actions/profile.jsx';
import { getCookie } from '../../utils/cookie.jsx';

 export function ProtectedRoute({ anonymous = false, isAuth, children, ...rest }) {
  const dispatch = useDispatch();
  const isTokenExist = !!localStorage.getItem('refreshToken')
console.log(getCookie('token'))
console.log(localStorage.getItem('refreshToken')
)
console.log(isTokenExist)

  useEffect(() => {
    if (!isAuth && isTokenExist) {
      dispatch(refreshAccessToken())
    }
    if(isTokenExist) {
      dispatch(refreshAccessToken())
      dispatch(getUserInfo())
      dispatch({type: USER_LOGIN})
    }
  }, [isTokenExist, isAuth]);

  const location = useLocation();
  if (anonymous && isAuth) {
    return <Redirect to={location?.state?.from || '/'} />;
  }
  
	if (!anonymous && !isAuth) {
    // ...то отправляем его, например, на форму входа
    return  <Redirect to={{ pathname: "/login", state: { from: location } }} />;
  }
	return <Route {...rest}>{children}</Route>;;
 }