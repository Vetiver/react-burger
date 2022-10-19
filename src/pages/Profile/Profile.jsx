import React, { useCallback, useState, useEffect } from 'react';
import Style from '../Profile/Profile.module.css';
import {
	Input, Button, ShowIcon, EmailInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from 'react-redux';
import {logout, refreshToken,  userLogout} from '../../services/actions/profile.jsx';
import {setUserData, infoUserData,  clearUserInfo} from '../../services/actions/profile.jsx';
import {deleteCookie} from "../../utils/cookie.jsx";
import { Redirect, useHistory } from 'react-router-dom'

function Profile(props) {
	const userInfo = useSelector(state => state.userInfo);
	const [form, setValue] = useState({ email: '', name: userInfo.user.name, password: '',});
	let dispatch = useDispatch();
	const isLogin = useSelector(state => state.isLogin);

		

	const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
	
		
  };
  
	const data = async userInf => {
		const res = await logout(userInf)
		.then (data => data)
		try{
			if(res.success == true) {
				dispatch(clearUserInfo())
				dispatch(userLogout())

			}
		} catch(err) {
			if (err.message === "jwt expired") {
				const refreshData = await refreshToken();
				if (!refreshData.success) {
					return Promise.reject(refreshData);
				}
		}
		}
	  }

	   let tryLogout = useCallback(
		e => {
		  e.preventDefault();
		  data({token:userInfo.refreshToken})
		  deleteCookie('token');
		},
		[]
	  );

		function resetUserInfo(form) {
			setUserData(form)
		}


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
		onChange={onChange}
		name={'name'}
		value={form.name}
		error={false}
		errorText={'Ошибка'}
		size={'default'}/>
		<EmailInput type={'email'} 
		placeholder={'E-mail'} 
		onChange={onChange}
		value={userInfo.user.email}
		error={false}/>
		<Input type={'password'} 
		placeholder={'Пароль'} 
		icon={'ShowIcon'}
		name={'password'}
		onChange={onChange}
		value={form.password}
		error={false}/>
		<div className={`${Style.buttonsContainer}`}>
		<Button type="secondary" size="small">
		<p className={`text text_type_main-default`}>Отмена</p>
		</Button>
		<Button onClick={resetUserInfo(form)} type="primary" size="small">
		<p className={`text text_type_main-default`}>Сохранить</p>
		</Button>
		</div>
	</div>
		</div>
  );
}

export default Profile;