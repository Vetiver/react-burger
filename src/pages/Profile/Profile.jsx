import React, { useCallback, useState, useEffect } from "react";
import Style from "../Profile/Profile.module.css";
import {
  Input,
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
} from "../../services/actions/profile.jsx";
import NavBar from '../../components/NavBar/NavBar.jsx';

function Profile(props) {
  const userInfo = useSelector((state) => state.profileReducer.userInfoData);
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
  }, [userInfo]);

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



  


  return (
    !!userInfo && (
    (userInfo.email == form.email) && (userInfo.name == form.name) ?
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
          <Button disabled={true} onClick={updateUserData} type="primary" size="small">
            <p className={`text text_type_main-default`}>Сохранить</p>
          </Button>
        </div>
      </div>
    </div>
  : 
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
      <Button type="secondary" size="small">
        <p className={`text text_type_main-default`}>Отмена</p>
      </Button>
      <Button onClick={updateUserData} type="primary" size="small">
        <p className={`text text_type_main-default`}>Сохранить</p>
      </Button>
    </div>
  </div>
</div>));
}

export default Profile;
