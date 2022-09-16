import React, {useEffect, useState, useMemo} from "react";
import PropTypes from "prop-types";
import { Reorder, useMotionValue } from "framer-motion"
import ElementBurger from "../ElementsBurger/ElementsBurger.jsx";
import Stuffing from "../Stuffing/Stuffing.jsx";
import {useDispatch, useSelector} from 'react-redux';
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Style from "../BurgerConstructor/BurgerConstructor.module.css";
import Modal from "../Modal/Modal.jsx";
import OrderDetails from "../OrderDetails/OrderDetails.jsx";
import { orderContext } from "../../contexts/orderContext.jsx";
import checkResponse from "../../utils/checkResponse.jsx";
import { useDrop, useD } from "react-dnd";
import {ADD_CONSTRUCTOR_ELEMENT, ADD_BUN_ELEMENT} from "../../services/actions/order.jsx";
import ElementBurgerDefault from '../ElementBurgerDefault.jsx';

 

function BurgerConstructor(props) {
  const ingredient = useSelector(state => state.constructorIngredients);
  const [items, sets] = useState(ingredient)
  useMemo(() => {
    sets(ingredient);
  }, [ingredient]);
  const bun = useSelector(state => state.buns)
  const dispatcher = useDispatch();
  const [visible, setTheme] = React.useState(false);
  const baseUrl = "https://norma.nomoreparties.space";
  let start = {
    price: 0,
  };

  

 

  const [, bunTarget] = useDrop({
    accept: "ingredient",
    
    drop(item) {
      if(item.type === 'bun') {
        dispatcher({ type: ADD_BUN_ELEMENT, payload: item });
      }
    },
  });

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    
    drop(item) {
      if(item.type !== 'bun'){
        dispatcher({ type: ADD_CONSTRUCTOR_ELEMENT, payload: item });
      }
    },
    
  });
 const constructorElements = useSelector(
   (state) => state.constructorIngredients
 );

  function reducer(state, action) {
    switch (action.type) {
      case "push": {
        return { ...state, price: state.price + action.payload };
      }
      case 'remove': {
        return {...state, price: state.price - action.payload}
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
    bun.length ===0 ? 
    <section className={`${Style.burgerContainer}`}>
      <orderContext.Provider value={{ dispatch }}>
        <ElementBurgerDefault bunTarget={bunTarget}>
          <div className={`${Style.ingredientsBar}`} ref={dropTarget} >
           
          </div>
        </ElementBurgerDefault>
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
    :
    <section className={`${Style.burgerContainer}`}>
      <orderContext.Provider value={{ dispatch }}>
        <ElementBurger bun={bun} bunTarget={bunTarget}>
        <Reorder.Group values={items} onReorder={sets}>
          <div className={`${Style.ingredientsBar}`} ref={dropTarget} >
            {items.map((el) => {
              return (
              <Stuffing el={el} key={el._id} />
            
              )
            })}
          </div>
        </Reorder.Group>
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
