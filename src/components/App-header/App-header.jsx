import React from "react";
import { NavLink, Link } from "react-router-dom";
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
      <NavLink
        to="/"
        className={`text_type_main-default ${Style.constructorContainer} ${Style.constructorTitle}`}
        activeClassName={Style.activeLink}
        exact={true}
      >
        <BurgerIcon type="primary" />
        Конструктор
      </NavLink>
      <NavLink
        to="/feed"
        className={`text_type_main-default ${Style.constructorContainer} ${Style.secondMargin} ${Style.constructorTitle} `}
        activeClassName={Style.activeLink}
        exact={true}
      >
        <ListIcon type="primary" />
        Лента заказов
      </NavLink>
      <Link to="/">
        <Logo />
      </Link>
      <NavLink
        to="/profile"
        className={`text_type_main-default ${Style.constructorContainer} ${Style.lastMargin} ${Style.constructorTitle} `}
        activeClassName={Style.activeLink}
      >
        <ProfileIcon type="primary" />
        Личный кабинет
      </NavLink>
    </header>
  );
}

export default AppHeader;
