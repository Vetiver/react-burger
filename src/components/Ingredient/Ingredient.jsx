import React, { Component, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ReactDOM } from "react";
import IngredientDetails from "../IngredientDetails/IngredientDetails.jsx";
import ModalOverlay from "../ModalOverlay/ModalOverlay.jsx";
import Modal from "../Modal/Modal.jsx";
import { burgerProps } from "../../utils/BurgerPropTypes.jsx";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Style from "../Ingredient/Ingredient.module.css";

function Ingredient({ ingredient }) {
  const [visible, setTheme] = React.useState(false);
  function handleOpenModal(e) {
    setTheme(true);
  }

  function handleCloseModal(e) {
    setTheme(false);
  }
  const modal = (
    <>
      <Modal onClose={handleCloseModal}>
        <IngredientDetails ingredient={ingredient} />
      </Modal>
    </>
  );
  return (
    <div onClick={handleOpenModal} className={`${Style.ingredientContainer}`}>
      {visible && modal}
      <img src={ingredient.image} alt={ingredient.name} />
      <div className={`${Style.classContainer}`}>
        <p className="text text_type_main-medium">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-small">{ingredient.name}</p>
    </div>
  );
}

Ingredient.propTypes = {
  ingredient: burgerProps.isRequired,
};

export default Ingredient;
