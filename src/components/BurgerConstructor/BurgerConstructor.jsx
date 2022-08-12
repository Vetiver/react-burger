import React, { Component } from 'react';
import ElementBurger from '../ElementsBurger/ElementsBurger.jsx';
import Stuffing from '../Stuffing/Stuffing.jsx';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import Style from '../BurgerConstructor/BurgerConstructor.module.css';
import mas from '../../utils/Mas.js'

const ingredients = mas.filter(el => el.type === 'sauce' || el.type === 'main')

class BurgerConstructor extends Component {
    render() {
        return (
            <section className={`${Style.burgerContainer}`}>
              <ElementBurger>
                <div className={`${Style.ingredientsBar}`}>
                  {ingredients.map(el =>{
                    return <Stuffing el={el}  key={el._id}/>
                  })}
                </div>
              </ElementBurger>
              <div className={`${Style.counter}`}>
                <div className={`${Style.counterContainer}`}>
                  <h2 className={`text text_type_main-large`}>610</h2>
                  <CurrencyIcon type="primary" />
                </div>
              <Button type="primary" size="medium">
              Оформить заказ
              </Button>
              </div>
            </section>
          
        );
    }
}


export default BurgerConstructor;