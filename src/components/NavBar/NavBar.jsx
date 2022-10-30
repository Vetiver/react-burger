import React, { useCallback, useState, useEffect } from "react";
import Style from '../NavBar/NavBar.module.css';
import { deleteCookie } from "../../utils/cookie.jsx";
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import {
    userLogoutFromAccount,
  } from "../../services/actions/profile.jsx";

function NavBar(props) {
    const dispatch = useDispatch();
    let tryLogout = useCallback((e) => {
      
        e.preventDefault();
        dispatch(userLogoutFromAccount());
        deleteCookie("token");
        localStorage.removeItem("refreshToken");
      }, []);
    return (
        <div className={`${Style.container}`}>
        <Link className={`${Style.link}`} to='/profile'>
        <p className="text text_type_main-medium">Профиль</p>
        </Link>
        <Link className={`${Style.link}`} to='/profile/orders'>
        <p className="text text_type_main-medium text_color_inactive">
          История заказов
        </p>
        </Link>
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
    );
}

export default NavBar;