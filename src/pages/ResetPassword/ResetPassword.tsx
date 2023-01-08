import React, { useCallback, useState } from "react";
import { Redirect } from "react-router-dom";
import Style from "../Register/Register.module.css";
import { Link } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { setPassword } from "../../services/actions/profile";


interface IForm {
  name: string | null;
  password: string | null;
}

const ResetPassword: React.FC = () => {
  const [success, setSuccess] = useState(false);
  const [form, setValue] = useState<IForm>({ password: "", name: "" });
  const data = async (form:React.ChangeEvent<HTMLInputElement>) => {
    const res = await setPassword(form).then((data) => data);
    if (res.success == true) {
      setSuccess(true);
    }
  };
  console.log(form);
  const onChange = (e:React.ChangeEvent<HTMLInputElement>): void => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  let reset = useCallback(
    (e:React.SyntheticEvent) => {
      e.preventDefault();
      data(form);
    },
    [form]
  );

  if (success) {
    return <Redirect to="/login" />;
  }

  return (
    <form className={`${Style.form}`}>
      <h1 className={`text_type_main-medium ${Style.text}`}>
        Восстановление пароля
      </h1>
      <Input
        type={"text"}
        placeholder={"Введите новый"}
        name={"password"}
        value={form.password}
        onChange={onChange}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
      />
      <Input
        type={"text"}
        name={"name"}
        value={form.name}
        onChange={onChange}
        placeholder={"Введите код из письма"}
        error={false}
      />
      <Button type="primary" onClick={reset} size="large">
        Сохранить
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

export default ResetPassword;
