import React, { useCallback, useState, useEffect } from "react";
import Style from "../Profile/Profile.module.css";
import {
  Input,
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  refreshToken,
  userLogoutFromAccount,
  setUser,
} from "../../services/actions/profile.jsx";
import { setUserData, clearUserInfo } from "../../services/actions/profile.jsx";
import { deleteCookie } from "../../utils/cookie.jsx";
import { Redirect } from "react-router-dom";
import { refreshAccessToken } from "../../services/actions/profile";

function Profile(props) {
  const userInfo = useSelector((state) => state.userInfo.user);
  const [form, setValue] = useState({ email: "", name: "", password: "" });
  let dispatch = useDispatch();
  const isLogin = useSelector((state) => state.isLogin);

  const onInputChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(refreshAccessToken());
    setValue({
      ...form,
      email: userInfo.email,
      name: userInfo.name,
    });
  }, []);

  const updateUserData = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(
        setUser({
          name: form.name,
          email: form.email,
        })
      );
    },
    [form]
  );

	console.log(form)

  let tryLogout = useCallback((e) => {
    e.preventDefault();
    dispatch(userLogoutFromAccount());
    deleteCookie("token");
    localStorage.removeItem("refreshToken");
  }, []);

  if (isLogin == false) {
    return <Redirect to="/login" />;
  }

  return (
    <div className={`${Style.mainContainer}`}>
      <div className={`${Style.container}`}>
        <p className="text text_type_main-medium">Профиль</p>
        <p className="text text_type_main-medium text_color_inactive">
          История заказов
        </p>
        <button
          onClick={tryLogout}
          className={`${Style.button} text text_type_main-medium text_color_inactive`}
        >
          <p className={` text text_type_main-medium text_color_inactive`}>
            Выход
          </p>
        </button>
        <p
          className={`${Style.text} text text_type_main-default text_color_inactive`}
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <div className={`${Style.inputContainer}`}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onInputChange}
          name={"name"}
          value={form.name}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
        <EmailInput
          type={"email"}
          placeholder={"E-mail"}
          onChange={onInputChange}
          value={form.email}
          error={false}
          name={"email"}
        />
        <Input
          type={"password"}
          placeholder={"Пароль"}
          icon={"ShowIcon"}
          name={"password"}
          onChange={onInputChange}
          value={form.password}
          error={false}
        />
        <div className={`${Style.buttonsContainer}`}>
          <Button type="secondary" size="small">
            <p className={`text text_type_main-default`}>Отмена</p>
          </Button>
          <Button onClick={updateUserData} type="primary" size="small">
            <p className={`text text_type_main-default`}>Сохранить</p>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
