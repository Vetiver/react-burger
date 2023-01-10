import React from "react";
import { ReactDOM } from "react";
import { useDrag } from "react-dnd";
import { burgerProps } from "../../utils/BurgerPropTypes.jsx";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Style from "../Ingredient/Ingredient.module.css";
import { IS_OPEN } from "../../services/actions/profile";
import { TAKE_ID_MODAL } from "../../services/actions/ingredients";
import { useTDispatch, useSelector} from "../../utils/types";

interface IIngredientProps {
  ingredient: {
    image: string;
    name: string;
    price: number;
    _id: string;
  };
}

const Ingredient = ({ ingredient }: IIngredientProps) => {
  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  const bunsNumber = useSelector(
    (state) =>
      state.ingredientReducer.buns.filter((item) => item._id === ingredient._id)
        .length
  );
  const number = useSelector(
    (state) =>
      state.ingredientReducer.constructorIngredients.filter(
        (item: any) => item._id === ingredient._id
      ).length
  );

  const dispatch = useTDispatch();
  function handleOpenModal() {
    dispatch({ type: IS_OPEN });
    dispatch({ type: TAKE_ID_MODAL, payload: ingredient._id });
  }

  return (
    !isDrag ? (
      <div
        onClick={handleOpenModal}
        className={`${Style.ingredientContainer}`}
        ref={dragRef}
      >
        <img
          className={`${Style.image}`}
          src={ingredient.image}
          alt={ingredient.name}
        />
        <div className={`${Style.classContainer}`}>
          <p className="text text_type_main-medium">{ingredient.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-small">{ingredient.name}</p>
        {bunsNumber ? (
          <Counter
            count={bunsNumber + 1}
            size="default"
          />
        ) : null}
        {number ? (
          <Counter  count={number} size="default" />
        ) : null}
      </div>
    ): null
  );
};

Ingredient.propTypes = {
  ingredient: burgerProps.isRequired,
};

export default Ingredient;
