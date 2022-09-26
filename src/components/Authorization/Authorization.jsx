import React from 'react';
import Style from "../Authorization/Authorization.module.css";
import {
    Input, Button, ShowIcon
  } from "@ya.praktikum/react-developer-burger-ui-components";

function Authorization(props) {
    return (
        <form className={`${Style.authorizationForm}`}>
        <h1>Вход</h1>
          <Input type={'text'}
            placeholder={'E-mail'}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}/>
          <Input type={'text'} 
            placeholder={'Пароль'} 
            icon={'ShowIcon'}
            error={false}/>
          <Button type="primary" size="large">
          Войти
          </Button>
        </form>
    );
}

export default Authorization;