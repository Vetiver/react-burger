import React, { useEffect, useState, useMemo } from "react";
import { Reorder } from "framer-motion";
import Stuffing from "../Stuffing/Stuffing";
import { useTDispatch, useTSelector, TLocation } from "../../utils/types";
import { useSelector } from 'react-redux'
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Style from "../BurgerConstructor/BurgerConstructor.module.css";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import { useDrop } from "react-dnd";
import {
  ADD_CONSTRUCTOR_ELEMENT,
  ADD_BUN_ELEMENT,
  ADD_PRICE,
} from "../../services/actions/ingredients";
import { ElementBurger } from "../ElementBurgerDefault/ElementBurgerDefault";
import { getOrderNumber } from "../../services/actions/ingredients";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";

const BurgerConstructor:React.FC = () => {
  const ingredient = useSelector(
    (state) => state.ingredientReducer.constructorIngredients
  );
  const main = useTSelector((state) => state.ingredientReducer.mainPrice);
  const history = useHistory();
  const [items, sets] = useState(ingredient);
  useMemo(() => {
    sets(ingredient);
  }, [ingredient]);
  const bun = useTSelector((state) => state.ingredientReducer.buns);
  const dispatcher = useTDispatch();
  const [visible, setTheme] = React.useState(false);
  const isLogin = useTSelector((state) => state.profileReducer.isLogin);
  const orderNumber = useTSelector((state) => state.orderReducer.orderNumber);
  const alls = bun.concat(ingredient);

  function open(e) {
    if (!isLogin) {
      e.preventDefault();
      history.push("/login");
    } else {
      dispatcher(getOrderNumber(alls));
      console.log("номер заказа скоро появится, нужно немного подождать");
      handleOpenModal();
    }
  }

  const [, bunTarget] = useDrop({
    accept: "ingredient",

    drop(item: any) : void {
      if (item.type === "bun") {
        dispatcher({ type: ADD_BUN_ELEMENT, payload: item });
      }
    },
  });

  const [, dropTarget] = useDrop({
    accept: "ingredient",

    drop(item: any) {
      if (item.type !== "bun") {
        dispatcher({
          type: ADD_CONSTRUCTOR_ELEMENT,
          payload: { ...item, uuid: uuidv4() },
        });
        dispatcher({ type: ADD_PRICE, payload: item.price });
      }
    },
  });
  
  function handleOpenModal() {
    setTheme(true);
  }

  function handleCloseModal() {
    setTheme(false);
  }

  const modal = (
    <Modal onClose={handleCloseModal}>
      <OrderDetails data={orderNumber} />
    </Modal>
  );
  return bun.length === 0 ? (
    <section className={`${Style.burgerContainer}`}>
      <ElementBurger bunTarget={bunTarget}>
        <div className={`${Style.ingredientsBar}`}/>
      </ElementBurger>
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
  ) : (
    <section className={`${Style.burgerContainer}`}>
      <ElementBurger bun={bun} bunTarget={bunTarget}>
        <Reorder.Group values={items} onReorder={sets}>
          <div className={`${Style.ingredientsBar}`} ref={dropTarget}>
            {items.map((el) => {
              return <Stuffing el={el} key={el.uuid} />;
            })}
          </div>
        </Reorder.Group>
      </ElementBurger>
      <div className={`${Style.counter}`}>
        <div className={`${Style.counterContainer}`}>
          <h2 className={`text text_type_main-large`}>
            {main + bun[0].price * 2}
          </h2>
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
