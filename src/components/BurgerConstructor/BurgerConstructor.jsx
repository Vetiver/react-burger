import React, { Component, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ElementBurger from '../ElementsBurger/ElementsBurger.jsx';
import Stuffing from '../Stuffing/Stuffing.jsx';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import Style from '../BurgerConstructor/BurgerConstructor.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay.jsx';
import OrderDetails from '../OrderDetails/OrderDetails.jsx';



function BurgerConstructor(props) {
  const ingredients = props.arr.filter(el => el.type === 'sauce' || el.type === 'main')
  const [visible, setTheme] = React.useState(false)
  function handleOpenModal() {
    setTheme(true);
    }

  function handleCloseModal() {
    setTheme(false);
  }
  const modal = (
    <ModalOverlay onClose={handleCloseModal}>
      <OrderDetails />
    </ModalOverlay>
  )  
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
        <Button onClick={handleOpenModal} type="primary" size="medium">
        Оформить заказ
        </Button>
        {visible && modal}
      </div>

    </section>       
  );  
}

BurgerConstructor.propTypes = {
  arr:  PropTypes.arrayOf(PropTypes.object).isRequired,
}; 


export default BurgerConstructor;