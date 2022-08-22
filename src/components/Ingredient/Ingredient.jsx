import React, { Component, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ReactDOM } from 'react';
import IngredientDetails from '../IngredientDetails/IngredientDetails.jsx';
import ModalOverlay from '../ModalOverlay/ModalOverlay.jsx';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Style from '../Ingredient/Ingredient.module.css';



function Ingredient(props) {
  const [visible, setTheme] = React.useState(false)
  function handleOpenModal() {
    setTheme(true);
    
    }

  function handleCloseModal(e) {
    setTheme(false);
  }
  const modal = (
    <ModalOverlay id="ModalOverlay" onClose={handleCloseModal}>  
      <IngredientDetails arr={props.arr} />
    </ModalOverlay>
  )  
  return (
    <div onClick={handleOpenModal} className={`${Style.ingredientContainer}`}>
      {visible && modal}
      <img src={props.arr.image} alt={props.arr.name} />
      <div className={`${Style.classContainer}`}>
        <p className='text text_type_main-medium'>{props.arr.price}</p>
        <CurrencyIcon type="primary" />
      </div>  
      <p className='text text_type_main-small'>{props.arr.name}</p>
    </div>
  );
}

Ingredient.propTypes = {
  arr: PropTypes.object.isRequired,
}; 

export default Ingredient;