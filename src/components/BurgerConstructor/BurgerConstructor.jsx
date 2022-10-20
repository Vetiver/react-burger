import React, {useEffect, useState, useMemo} from "react";
import {Reorder} from "framer-motion"
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
import { useDrop } from "react-dnd";
import {ADD_CONSTRUCTOR_ELEMENT, ADD_BUN_ELEMENT, baseUrl, ADD_PRICE} from "../../services/actions/ingredients.jsx";
import ElementBurgerDefault from '../ElementBurgerDefault/ElementBurgerDefault.jsx';
import { getOrderNumber } from "../../services/actions/ingredients";
import { v4 as uuidv4 } from 'uuid';
import {useHistory } from 'react-router-dom';


function BurgerConstructor() {
  const ingredient = useSelector(state => state.constructorIngredients);
  const main = useSelector(state => state.mainPrice);
  const history = useHistory()
  const [items, sets] = useState(ingredient)
  useMemo(() => {
    sets(ingredient);
  }, [ingredient]);
  const bun = useSelector(state => state.buns)
  const dispatcher = useDispatch();
  const [visible, setTheme] = React.useState(false);
  const isLogin = useSelector(state => state.isLogin);
  const orderNumber = useSelector(state => state.orderNumber);
  
  function open(e) {
    if (!isLogin) {
      e.preventDefault()
      history.push('/login')
    } else {
      dispatcher(getOrderNumber())
      handleOpenModal()
    }
    }
   
 

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
    
        dispatcher({ type: ADD_CONSTRUCTOR_ELEMENT, payload:{...item, uuid: uuidv4()} });
        dispatcher({ type: ADD_PRICE, payload: item.price});
      }
    },
    
  });
 const constructorElements = useSelector(
   (state) => state.constructorIngredients
 );  
  
  




  function handleOpenModal() {
    setTheme(true);
  }

  function handleCloseModal(e) {
    setTheme(false);
  }
  
  const modal = (
      <Modal onClose={handleCloseModal}>
        <OrderDetails data={orderNumber} />
      </Modal>
  );
  return (
    bun.length ===0 ? 
    <section className={`${Style.burgerContainer}`}>
      
        <ElementBurgerDefault bunTarget={bunTarget}>
          <div className={`${Style.ingredientsBar}`} ref={dropTarget} >
           
          </div>
        </ElementBurgerDefault>
        <div className={`${Style.counter}`}>
          <div className={`${Style.counterContainer}`}>
            <h2 className={`text text_type_main-large`}></h2>
            <CurrencyIcon type="primary" />
          </div>
          <Button disabled={true} type="primary" size="medium">
            Оформить заказ
          </Button>
          {visible && modal}
        </div>
      
    </section>
    :
    <section className={`${Style.burgerContainer}`}>
      
        <ElementBurger bun={bun} bunTarget={bunTarget}>
        <Reorder.Group values={items} onReorder={sets}>
          <div className={`${Style.ingredientsBar}`} ref={dropTarget} >
            {items.map((el) => {
              return (
              <Stuffing el={el} key={el.uuid} />
              )
            })}
          </div>
        </Reorder.Group>
        </ElementBurger>
        <div className={`${Style.counter}`}>
          <div className={`${Style.counterContainer}`}>
            <h2 className={`text text_type_main-large`}>{main + bun[0].price}</h2>
            <CurrencyIcon type="primary" />
          </div>
          <Button onClick={open} type="primary" size="medium">
            Оформить заказ
          </Button>
          {visible && modal}
        </div>
    </section>
  );
}



export default BurgerConstructor;
