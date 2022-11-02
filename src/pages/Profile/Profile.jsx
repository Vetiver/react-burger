import React, { useCallback, useState, useEffect } from "react";
import Style from "../Profile/Profile.module.css";
import {
  Input,
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  getUserInfo,
  refreshAccessToken,
} from "../../services/actions/profile.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../services/actions/profile.jsx";
import NavBar from "../../components/NavBar/NavBar.jsx";

function Profile(props) {
  const userInfo = useSelector((state) => state.profileReducer.userInfoData);
  const [form, setValue] = useState({ email: "", name: "", password: "" });
  const [disabled, setDisabled] = useState({ disabled: true})
  let dispatch = useDispatch();
  const onInputChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
    if(userInfo.email == form.email && userInfo.name == form.name && form.password == '') {
      setDisabled(false);
    }
  };

  const revoke = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(
        setValue({
          name: userInfo.name,
          email: userInfo.email,
          password: userInfo.password,
        })
      );
    },
    [form]
  );

  useEffect(() => {
    setValue({
      ...form,
      email: userInfo.email,
      name: userInfo.name,
    });
  }, [userInfo]);

  const updateUserData = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(
        setUser({
          name: form.name,
          email: form.email,
          password: form.password,
        })
      );
      setValue({
        name: form.name,
        email: form.email,
      })
      setDisabled(true);
    },
    [form]
  );

  return (
    !!userInfo &&
    (disabled ? (
      <div className={`${Style.mainContainer}`}>
        <div>
          <NavBar />
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
            <Button disabled={true} type="secondary" size="small">
              <p className={`text text_type_main-default`}>Отмена</p>
            </Button>
            <Button
              disabled={true}
              onClick={updateUserData}
              type="primary"
              size="small"
            >
              <p className={`text text_type_main-default`}>Сохранить</p>
            </Button>
          </div>
        </div>
      </div>
    ) : (
      <div className={`${Style.mainContainer}`}>
        <div>
          <NavBar />
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
            <Button onClick={revoke} type="secondary" size="small">
              <p className={`text text_type_main-default`}>Отмена</p>
            </Button>
            <Button onClick={updateUserData} type="primary" size="small">
              <p className={`text text_type_main-default`}>Сохранить</p>
            </Button>
          </div>
        </div>
      </div>
    ))
  );
}

export default Profile;
