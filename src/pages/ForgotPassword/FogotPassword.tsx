import React, { useCallback, useState } from "react";
import Style from "../ForgotPassword/ForgotPassword.module.css";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { resetPassword } from "../../services/actions/profile";


const FogotPassword: React.FC = () => {
  const [success, setSuccess] = useState(false);
  const [form, setValue] = useState({ email: "" });
  const data = async (form: any) => {
    const res = await resetPassword(form).then((data) => data);
    if (res.success == true) {
      setSuccess(true);
    }
  };
  const onChange = (e:React.ChangeEvent<HTMLInputElement>): void => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
  let getEmail = useCallback(
    (e:React.SyntheticEvent): void => {
      e.preventDefault();
      data(form);
    },
    [form]
  );

  if (success) {
    return <Redirect to="/reset-password" />;
  }
  return (
    <form className={`${Style.form}`}>
      <h1 className={`text_type_main-medium ${Style.text}`}>
        Восстановление пароля
      </h1>
      <Input
        type={"email"}
        placeholder={"Укажите e-mail"}
        name={"email"}
        value={form.email}
        onChange={onChange}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
      />
      <Button onClick={getEmail}  type="primary" size="large">
        Восстановить
      </Button>
      <div className={`${Style.linkContainer}`}>
        <p
          className={`text_type_main-default text_color_inactive ${Style.link}`}
        >
          Вспомнили пароль?
          <Link className={`${Style.text}`} to="/login">
            {" "}
            Войти
          </Link>
        </p>
      </div>
    </form>
  );
}

export default FogotPassword;
