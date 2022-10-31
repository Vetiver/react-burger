import React, { useCallback, useState, useEffect } from "react";
import Style from '../NavBar/NavBar.module.css';
import { deleteCookie } from "../../utils/cookie.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from "react-router-dom";
import {
    userLogoutFromAccount,
  } from "../../services/actions/profile.jsx";

function NavBar(props) {
    const dispatch = useDispatch();
    const tryLogout = useCallback((e) => {
        e.preventDefault();
        dispatch(userLogoutFromAccount());
        deleteCookie("token");
        localStorage.removeItem("refreshToken");
      }, []);
    return (
        <div className={`${Style.container}`}>
        <NavLink exact={true} className={`text text_type_main-medium ${Style.link}`} activeClassName={Style.activeLink} to='/profile'>
        Профиль
        </NavLink>
        <NavLink exact={true} className={`text text_type_main-medium ${Style.link}`} activeClassName={Style.activeLink} to='/profile/orders'>
          История заказов
        </NavLink>
        <button
          onClick={tryLogout}
          className={`${Style.button} text text_type_main-medium text_color_inactive`}
        >
          <p className={` text text_type_main-medium text_color_inactive`}>
            Выход
          </p>
        </button>
      </div>
    );
}

export default NavBar;