import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Redirect, useLocation } from "react-router-dom";
import {
  getUserInfo,
  refreshAccessToken,
  USER_LOGIN,
} from "../../services/actions/profile";
import { getCookie } from "../../utils/cookie.jsx";
import { useTDispatch, TLocation } from "../../utils/types";

interface IProtectedRouteProps {
  anonymous?: boolean;
  isAuth: boolean;
  children: React.ReactNode; 
  path: string;
  exact?: boolean;
}

export const ProtectedRoute: React.FC<IProtectedRouteProps> = ({
  anonymous = false,
  isAuth,
  children,
  ...rest
}) => {
  const dispatch = useTDispatch();
  const isTokenExist = !!localStorage.getItem("refreshToken");

  useEffect(() => {
    if (isTokenExist) {
      dispatch({ type: USER_LOGIN });
    }
  }, [isTokenExist, isAuth]);

  const location = useLocation<TLocation>();
  if (anonymous && isAuth) {
    return <Redirect to={location?.state?.from || "/"} />;
  }

  if (!anonymous && !isAuth) {
    // ...то отправляем его, например, на форму входа
    return <Redirect to={{ pathname: "/login", state: { from: location } }} />;
  }

  return <Route {...rest}>{children}</Route>;
}
