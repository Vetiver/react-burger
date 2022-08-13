import React, { Component } from 'react';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Style from '../Ingredient/Ingredient.module.css';

function Ingredient(props) {
  return (
    <div className={`${Style.ingredientContainer}`}>
      <img src={props.arr.image} alt={props.arr.name} />
      <div className={`${Style.classContainer}`}>
        <p className='text text_type_main-medium'>{props.arr.price}</p>
        <CurrencyIcon type="primary" />
      </div>  
      <p className='text text_type_main-small'>{props.arr.name}</p>
    </div>
  );
}

export default Ingredient;