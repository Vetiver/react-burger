import React, { useCallback, useState, useEffect } from "react";
import Style from "../Profile/Profile.module.css";
import {
  Input,
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import {
  userLogoutFromAccount,
  setUser,
} from "../../services/actions/profile.jsx";
import NavBar from '../../components/NavBar/NavBar.jsx';

function Profile(props) {
  const userInfo = useSelector((state) => state.userInfoData);
  const [form, setValue] = useState({ email: "", name: "", password: "" });
  let dispatch = useDispatch();
  const onInputChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
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

  


  return (
    <div className={`${Style.mainContainer}`}>
      <NavBar />
      <div className={`${Style.inputContainer}`}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onInputChange}
          name={"name"}
          value={userInfo.name}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
        <EmailInput
          type={"email"}
          placeholder={"E-mail"}
          onChange={onInputChange}
          value={userInfo.email}
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
