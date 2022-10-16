import React, { useCallback, useState } from 'react';
import Style from '../Profile/Profile.module.css';
import {
	Input, Button, ShowIcon, EmailInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from 'react-redux';
import {logout, userLogout} from '../../services/actions/profile.jsx';
import {setUserData, clearUserInfo} from '../../services/actions/profile.jsx';
import {deleteCookie} from "../../utils/cookie.jsx";
import { Redirect, useHistory } from 'react-router-dom'

function Profile(props) {
	const [success, setSuccess] = useState(false);
	let dispatch = useDispatch();
	const userInfo = useSelector(state => state.userInfo);
	const isLogin = useSelector(state => state.isLogin);
	console.log(userInfo)
	const data = async userInf => {
		const res = await logout(userInf)
		.then (data => data)
		console.log(res)
		if(res.success == true) {
		  dispatch(clearUserInfo())
		  dispatch(userLogout())
		  setSuccess(true)
		}
	  
	   }
	   let tryLogout = useCallback(
		e => {
		  e.preventDefault();
		  data({token:userInfo.refreshToken})
		  deleteCookie('token');
		  console.log(document.cookie);
		},
		[]
	  );

	  if (isLogin == false) {
		return (
		  <Redirect
			to='/login'
		  />
		);
	  }




  return (
	  <div className={`${Style.mainContainer}`}>
    <div className={`${Style.container}`}>
        <p className="text text_type_main-medium">
			Профиль
		</p>
		<p className="text text_type_main-medium text_color_inactive">
		История заказов
		</p>
		<button onClick={tryLogout} className={`${Style.button} text text_type_main-medium text_color_inactive`}>
		<p className={` text text_type_main-medium text_color_inactive`}>Выход</p>
		</button>       
		<p className={`${Style.text} text text_type_main-default text_color_inactive`}>
		В этом разделе вы можете
		изменить свои персональные данные
		</p>
    </div>
	<div className={`${Style.inputContainer}`}>
		<Input type={'text'}
		placeholder={'Имя'}
		name={'name'}
		value={userInfo.user.name}
		error={false}
		errorText={'Ошибка'}
		size={'default'}/>
		<EmailInput type={'email'} 
		placeholder={'E-mail'} 
		value={userInfo.user.email}
		error={false}/>
		<Input type={'password'} 
		placeholder={'Пароль'} 
		icon={'ShowIcon'}
		error={false}/>
		<div className={`${Style.buttonsContainer}`}>
		<Button type="secondary" size="small">
		<p className={`text text_type_main-default`}>Отмена</p>
		</Button>
		<Button type="primary" size="small">
		<p className={`text text_type_main-default`}>Сохранить</p>
		</Button>
		</div>
	</div>
		</div>
  );
}

export default Profile;