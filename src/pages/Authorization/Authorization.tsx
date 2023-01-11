import React, { useCallback, useState } from "react";
import { Link  } from "react-router-dom";
import Style from "../Authorization/Authorization.module.css";
import { refreshAccessToken } from "../../services/actions/profile";
import {
  Input,
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useTDispatch } from "../../utils/types";
import { loginUserInfo } from "../../services/actions/profile";



interface IAuthorization {
  email: string;
  password: string;
}

interface IForm {
  email: string;
  password: string;
}



const Authorization: React.FC<IAuthorization> = () => {
  const dispatch = useTDispatch();
  const [form, setValue] = useState({ email: "", password: "" });
  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
  const login = useCallback(
    (e:React.SyntheticEvent) => {
      e.preventDefault();
      dispatch(loginUserInfo(form));
      dispatch(refreshAccessToken());
    },
    [loginUserInfo, form]
  );
  return (
    <form onSubmit={login} className={`${Style.authorizationForm}`}>
      <h1 className={`${Style.text}`}>Вход</h1>
      <Input
        type={"email"}
        placeholder={"E-mail"}
        onChange={onChange}
        name={"email"}
        error={false}
        value={form.email}
        errorText={"Ошибка"}
        size={"default"}
      />
      <Input
        type={"password"}
        placeholder={"Пароль"}
        name={"password"}
        onChange={onChange}
        value={form.password}
        icon={"ShowIcon"}
        error={false}
      />
      <Button onClick={login} htmlType="button" type="primary" size="large">
        Войти
      </Button>
      <div className={`${Style.linkContainer}`}>
        <p
          className={`text_type_main-default text_color_inactive ${Style.text}`}
        >
          Вы — новый пользователь?
          <Link className={`${Style.text}`} to="/register">
            {" "}
            Зарегистрироваться
          </Link>
        </p>
        <p
          className={`text_type_main-default text_color_inactive ${Style.text}`}
        >
          Забыли пароль?
          <Link className={`${Style.text}`} to="/forgot-password">
            {" "}
            Восстановить пароль
          </Link>
        </p>
      </div>
    </form>
  );
}

export default Authorization;
