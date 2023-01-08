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
} from "../../services/actions/profile.js";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../services/actions/profile";
import NavBar from "../../components/NavBar/NavBar";
import { useTDispatch, useTSelector, TLocation, TOrders, TUser } from "../../utils/types";

interface IForm {
  email: string;
  name: string;
  password?: any;
}

interface IDisabled {
  disabled?: boolean;
}

const Profile = () => {
  const userInfo = useTSelector((state) => state.profileReducer.userInfoData);
  const [form, setValue] = useState<IForm>({ email: "", name: "", password: "" });
  const [disabled, setDisabled] = useState<IDisabled>({ disabled: true });
  let dispatch = useTDispatch();
  const onInputChange = (e:React.ChangeEvent<HTMLInputElement>): void => {
    setValue({ ...form, [e.target.name]: e.target.value });
    if (
      userInfo.email == form.email &&
      userInfo.name == form.name &&
      form.password == ""
    ) {
      setDisabled(false);
    }
  };

  const revoke = useCallback(
    (e:React.SyntheticEvent) => {
      e.preventDefault();
        setValue({
          name: userInfo.name,
          email: userInfo.email,
          password: userInfo.password,
        })
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
    (e:React.SyntheticEvent): void => {
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
      });
      setDisabled(true);
    },
    [form]
  );

  return (
    !!userInfo && (
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
            <Button onClick={revoke} disabled={disabled} type="secondary" size="small">
              <p className={`text text_type_main-default`}>Отмена</p>
            </Button>
            <Button
              disabled={disabled}
              onClick={updateUserData}
              type="primary"
              size="small"
            >
              <p className={`text text_type_main-default`}>Сохранить</p>
            </Button>
          </div>
        </div>
      </div>
    )
  );
}

export default Profile;
