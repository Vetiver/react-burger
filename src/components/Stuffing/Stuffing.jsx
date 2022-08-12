import React, { Component } from 'react';
import {DragIcon, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import Style from '../Stuffing/Stuffing.module.css';



function Stuffing(props) {
  return (
    <div className={`${Style.stuffingBar}`}>
      <DragIcon type="primary" />
      <ConstructorElement
      text={props.el.name}
      price={props.el.price}
      thumbnail={props.el.image_mobile} />
    </div>
  );
}

export default Stuffing;