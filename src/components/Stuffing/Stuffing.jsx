import React, { Component, useEffect, useContext } from "react";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { burgerProps } from "../../utils/BurgerPropTypes.jsx";
import Style from "../Stuffing/Stuffing.module.css";
import { orderContext } from "../../contexts/orderContext.jsx";

function Stuffing({ el }) {
  const { dispatch } = React.useContext(orderContext);
  React.useEffect(() => {
    dispatch({ type: "push", payload: el.price });
  }, []);
  return (
    <div className={`${Style.stuffingBar}`}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={el.name}
        price={el.price}
        thumbnail={el.image_mobile}
      />
    </div>
  );
}

Stuffing.propTypes = {
  el: burgerProps.isRequired,
};

export default Stuffing;
