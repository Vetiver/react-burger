import React, { Component, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import ElementBurger from "../ElementsBurger/ElementsBurger.jsx";
import Stuffing from "../Stuffing/Stuffing.jsx";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Style from "../BurgerConstructor/BurgerConstructor.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay.jsx";
import Modal from "../Modal/Modal.jsx";
import { BurgerContext } from "../../contexts/BurgerContext.jsx";
import OrderDetails from "../OrderDetails/OrderDetails.jsx";
import { burgerProps } from "../../utils/BurgerPropTypes.jsx";
import { orderContext } from "../../contexts/orderContext.jsx";
import checkResponse from "../../utils/checkResponse.jsx";

function BurgerConstructor() {
  const arr = React.useContext(BurgerContext);
  const ingredients = arr.filter(
    (el) => el.type === "sauce" || el.type === "main"
  );
  const [visible, setTheme] = React.useState(false);
  const baseUrl = "https://norma.nomoreparties.space";
  let start = {
    price: 0,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "push": {
        return { ...state, price: state.price + action.payload };
      }
      default:
        return state;
    }
  }
  const [state, dispatch] = React.useReducer(reducer, start);

  const [api, apiState] = React.useState({
    isLoading: false,
    hasError: false,
    data: null,
  });

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ingredients: ["60d3b41abdacab0026a733c6"],
    }),
  };
  const pushData = async () => {
    apiState({ ...api, isLoading: true });
    try {
      const res = await fetch(`${baseUrl}/api/orders`, options);
      const data = await checkResponse(res);
      apiState({ ...api, data: data, isLoading: false });
      handleOpenModal();
    } catch (error) {
      console.error(error);
    }
  };

  const { data } = api;

  function handleOpenModal() {
    setTheme(true);
  }

  function handleCloseModal(e) {
    setTheme(false);
  }

  const modal = (
    <>
      <Modal onClose={handleCloseModal}>
        <OrderDetails data={data} />
      </Modal>
    </>
  );
  return (
    <section className={`${Style.burgerContainer}`}>
      <orderContext.Provider value={{ dispatch }}>
        <ElementBurger>
          <div className={`${Style.ingredientsBar}`}>
            {ingredients.map((el) => {
              return <Stuffing el={el} key={el._id} />;
            })}
          </div>
        </ElementBurger>
        <div className={`${Style.counter}`}>
          <div className={`${Style.counterContainer}`}>
            <h2 className={`text text_type_main-large`}>{state.price}</h2>
            <CurrencyIcon type="primary" />
          </div>
          <Button onClick={pushData} type="primary" size="medium">
            Оформить заказ
          </Button>
          {visible && modal}
        </div>
      </orderContext.Provider>
    </section>
  );
}

/*BurgerConstructor.propTypes = {
  arr: PropTypes.arrayOf(burgerProps).isRequired,
}; */

export default BurgerConstructor;
