 import { Route } from 'react-router-dom';
 import {useDispatch, useSelector} from 'react-redux';
 import { useEffect, useState } from 'react';
 import { Redirect} from 'react-router-dom'

 export function ProtectedRoute({ anonymous = false, isAuth, children, ...rest }) {
    // Вернём из хранилища запрос на получение данных о пользователе и
    // текущий объект с пользователем

	if (!anonymous && !isAuth) {
    // ...то отправляем его, например, на форму входа
    return <Redirect to="/login" />;
  }
	return <Route {...rest}>{children}</Route>;;
 }