import React, { Component } from 'react';
import {DragIcon, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import {burgerProps} from "../../utils/BurgerPropTypes.jsx";
import Style from '../Stuffing/Stuffing.module.css';



function Stuffing({ el }) {
  return (
    <div className={`${Style.stuffingBar}`}>
      <DragIcon type="primary" />
      <ConstructorElement
      text={el.name}
      price={el.price}
      thumbnail={el.image_mobile} />
    </div>
  );
}

Stuffing.propTypes = {
  el: PropTypes.shape(burgerProps).isRequired,
}; 

export default Stuffing;