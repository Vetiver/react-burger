import React, { useCallback, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom'
import Style from "../Register/Register.module.css";
import { Link } from 'react-router-dom';
import {
    Input, Button, ShowIcon, EmailInput
  } from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from 'react-redux';
import { setUserInfo } from '../../services/actions/profile.jsx';

function Register(props) {
  const userInfo = useSelector(state => state.userInfo);
  const [form, setValue] = useState({ email: '', password: '', name: '', });
  const dispatch = useDispatch();
  console.log(form)
  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
  const registerUser = (form) => {
    dispatch(setUserInfo(form));
  };
  let login = useCallback(
    e => {
      e.preventDefault();
      registerUser(form)
      console.log(userInfo)
    },
    [setUserInfo, form]
  );




    return (
        <form className={`${Style.form}`}>
            <h1 className={`text_type_main-medium ${Style.text}`}>Регистрация</h1>
          <Input type={'text'}
            placeholder={'Имя'}
            name={'name'}
            error={false}
            onChange={onChange}
            value={form.name}
            errorText={'Ошибка'}
            size={'default'}/>
          <EmailInput type={'email'} 
            placeholder={'E-mail'} 
            name={'email'}
            onChange={onChange}
            value={form.email}
            error={false}/>
          <Input type={'password'} 
            placeholder={'Пароль'} 
            value={form.password}
            onChange={onChange}
            name={'password'}
            icon={'ShowIcon'}
            error={false}/>
          <Button type="primary" onClick={login} size="large">
          Зарегистрироваться
          </Button>
        <div className={`${Style.linkContainer}`}>
          <p className={`text_type_main-default text_color_inactive ${Style.link}`}>Уже зарегистрированы? 
          <Link className={`${Style.text}`} to='/login'> Войти</Link>
          </p>
        </div>
        </form>
    );
}

export default Register;