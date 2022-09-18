import React  from "react";
import { ReactDOM } from "react";
import IngredientDetails from "../IngredientDetails/IngredientDetails.jsx";
import {useDispatch, useSelector} from 'react-redux';
import { useDrag } from "react-dnd";
import Modal from "../Modal/Modal.jsx";
import { burgerProps } from "../../utils/BurgerPropTypes.jsx";
import { CurrencyIcon,  Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import Style from "../Ingredient/Ingredient.module.css";

function Ingredient({ ingredient }) {

  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  const bunsNumber = useSelector((state) => state.buns.filter(
    (item) => item._id === ingredient._id).length)
  const number = useSelector((state) => state.constructorIngredients.filter(
        (item) => item._id === ingredient._id).length
  );

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
    !isDrag && 
    <div onClick={handleOpenModal} className={`${Style.ingredientContainer}`} ref={dragRef}>
      {visible && modal}
      <img className={`${Style.image}`} src={ingredient.image} alt={ingredient.name} />
      <div className={`${Style.classContainer}`}>
        <p className="text text_type_main-medium">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-small">{ingredient.name}</p>
      {bunsNumber ? (
        <Counter
          className={Style.counter}
          count={bunsNumber}
          size="default"
        />
      ) : null}
      {number ? (
        <Counter
          className={Style.counter}
          count={number}
          size="default"
        />
      ) : null}
    </div>
  );
}

Ingredient.propTypes = {
  ingredient: burgerProps.isRequired,
};

export default Ingredient;
