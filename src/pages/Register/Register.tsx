import React, { useCallback, useState } from "react";
import Style from "../Register/Register.module.css";
import { Link, Redirect } from "react-router-dom";
import {
  Input,
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../services/actions/profile";
import { useTDispatch, useTSelector, TLocation, TOrders } from "../../utils/types";
const Register:React.FC = () => {
  const isLogin = useTSelector((state) => state.profileReducer.isLogin);
  const [form, setValue] = useState({ email: "", password: "", name: "" });
  const dispatch = useTDispatch();
  const onChange = (e:React.ChangeEvent<HTMLInputElement>): void => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
  const registerUser = (form: any) => {
    dispatch(setUserInfo(form));
  };
  let login = useCallback(
    (e:React.SyntheticEvent): void => {
      e.preventDefault();
      registerUser(form);
    },
    [setUserInfo, form]
  );
  if (isLogin) {
    return <Redirect to="/profile" />;
  }

  return (
    <form className={`${Style.form}`}>
      <h1 className={`text_type_main-medium ${Style.text}`}>Регистрация</h1>
      <Input
        type={"text"}
        placeholder={"Имя"}
        name={"name"}
        error={false}
        onChange={onChange}
        value={form.name}
        errorText={"Ошибка"}
        size={"default"}
      />
      <Input
        type={"email"}
        placeholder={"E-mail"}
        name={"email"}
        onChange={onChange}
        value={form.email}
        error={false}
      />
      <Input
        type={"password"}
        placeholder={"Пароль"}
        value={form.password}
        onChange={onChange}
        name={"password"}
        icon={"ShowIcon"}
        error={false}
      />
      <Button type="primary" onClick={login} size="large">
        Зарегистрироваться
      </Button>
      <div className={`${Style.linkContainer}`}>
        <p
          className={`text_type_main-default text_color_inactive ${Style.link}`}
        >
          Уже зарегистрированы?
          <Link className={`${Style.text}`} to="/login">
            {" "}
            Войти
          </Link>
        </p>
      </div>
    </form>
  );
}

export default Register;
