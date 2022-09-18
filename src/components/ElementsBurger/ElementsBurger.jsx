import React from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { OrderContext } from "../../contexts/orderContext.jsx";
import { useDrop } from "react-dnd";
import PropTypes from 'prop-types';
import  Style  from '../ElementsBurger/ElementBurger.module.css';
export default function ElementBurger( {bun, children, bunTarget} ) {
  return (
    <div ref={bunTarget}
    className={`${Style.element}`}
    >
      <ConstructorElement
        type="top"
        isLocked={true}
        text={`${bun[0].name} (верх)`}
        price={bun[0].price}
        thumbnail={bun[0].image_mobile}
      />
      {children}
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${bun[0].name} (низ)`}
        price={bun[0].price}
        thumbnail={bun[0].image_mobile}
      />
    </div>
  );
}

ElementBurger.propTypes = { 
  bun: PropTypes.arrayOf( PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
  })).isRequired
};