import React, { Component, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ReactDOM } from 'react';
import IngredientDetails from '../IngredientDetails/IngredientDetails.jsx';
import ModalOverlay from '../ModalOverlay/ModalOverlay.jsx';
import Modal from '../Modal/Modal.jsx';
import {burgerProps} from "../../utils/BurgerPropTypes.jsx";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Style from '../Ingredient/Ingredient.module.css';



function Ingredient({ arr }) {
  const [visible, setTheme] = React.useState(false)
  function handleOpenModal(e) {
    setTheme(true);
    }

  function handleCloseModal(e) {
    setTheme(false);
  }
  const modal = (
    <>
    <Modal onClose={handleCloseModal}>
    <IngredientDetails arr={arr} />
    </Modal>
    <ModalOverlay id="ModalOverlay" onClose={handleCloseModal} />  
    </>
  )  
  return (
    <div onClick={handleOpenModal} className={`${Style.ingredientContainer}`}>
      {visible && modal}
      <img src={arr.image} alt={arr.name} />
      <div className={`${Style.classContainer}`}>
        <p className='text text_type_main-medium'>{arr.price}</p>
        <CurrencyIcon type="primary" />
      </div>  
      <p className='text text_type_main-small'>{arr.name}</p>
    </div>
  );
}

Ingredient.propTypes = {
  arr: PropTypes.shape(burgerProps).isRequired,
}; 

export default Ingredient;