import React, { useCallback, useState } from 'react';
import Style from "../ForgotPassword/ForgotPassword.module.css";
import { Redirect, useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {
    Input, Button, ShowIcon, 
  } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAuth } from '../../services/auth.jsx';
import { resetPassword} from '../../services/actions/profile.jsx';

function FogotPassword(props) {
  const [success, setSuccess] = useState(false);
  const userInfo = useSelector(state => state.userInfo);
  const dispatch = useDispatch();
  const [form, setValue] = useState({ email: ''});
  console.log(form)
 const data = async form => {
  const res = await resetPassword(form)
  .then (data => data)
  if(res.success == true) {
    setSuccess(true)
  }

 }
  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
  let getEmail = useCallback(
    e => {
      e.preventDefault();
      data(form)
      console.log(success)
    },
    [ form]
  );

  if (success) {
    return (
      <Redirect
        to='/reset-password'
      />
    );
  }
    return (
        
        <form className={`${Style.form}`}>
          <h1 className={`text_type_main-medium ${Style.text}`}>Восстановление пароля</h1>
          <Input type={'email'}
            placeholder={'Укажите e-mail'}
            name={'email'}
            value={form.email}
            onChange={onChange}
            error={false}
            errorText={'Ошибка'}
            size={'default'}/>
         <Button onClick={getEmail} type="primary" size="large">
          Восстановить
          </Button>
        <div className={`${Style.linkContainer}`}>
          <p className={`text_type_main-default text_color_inactive ${Style.link}`}>Вспомнили пароль? 
          <Link className={`${Style.text}`} to='/login'> Войти</Link>
          </p>
        </div>
        </form>
    );
}

export default FogotPassword;