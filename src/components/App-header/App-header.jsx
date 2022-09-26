import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Style from "../App-header/App-header.module.css";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
  return (
    <header className={Style.appHeader}>
      <Link
        to='/'
        className={`${Style.constructorContainer}`}
      >
        <BurgerIcon type="primary" />
        <p className={`text_type_main-default ${Style.constructorTitle}`}>
          Конструктор
        </p>
      </Link>
      <Link
        to='/'
        className={`${Style.constructorContainer} ${Style.secondMargin}`}
      >
        <ListIcon type="secondary" />
        <p
          className={`${Style.constructorTitle}  text_type_main-default text_color_inactive`}
        >
          Лента заказов
        </p>
      </Link>
      <Logo />
      <Link
        to='/login'
        className={`${Style.constructorContainer} ${Style.lastMargin}`}
      >
        <ProfileIcon type="secondary" />
        <p
          className={`${Style.constructorTitle} text_type_main-default text_color_inactive`}
        >
          Личный кабинет
        </p>
      </Link>
    </header>
  );
}

export default AppHeader;
