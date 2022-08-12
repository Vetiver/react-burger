import React, { Component } from 'react';
import Style from "../App-header/App-header.module.css";
import { BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'

class AppHeader extends Component {
    render() {
        return (
            <div className={Style.appHeader}>
              <a href="#" className={`${Style.constructorContainer} ${Style.firstMargin}`}>
                <BurgerIcon type="primary" />
                <p className={`text_type_main-default ${Style.constructorTitle}`}>Конструктор</p>
              </a>
              <a href="#" className={`${Style.constructorContainer} ${Style.secondMargin}`}>
                <ListIcon type="secondary" />
                <p className={`${Style.constructorTitle}  text_type_main-default text_color_inactive`}>Лента заказов</p>
              </a>
              <Logo />
              <a href="#" className={`${Style.constructorContainer} ${Style.lastMargin}`}>
                <ProfileIcon type="secondary" />
                <p className={`${Style.constructorTitle} text_type_main-default text_color_inactive`}>Личный кабинет</p>
              </a>
            </div>
        );
    }
}

export default AppHeader;