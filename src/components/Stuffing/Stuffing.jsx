import React from "react";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { burgerProps } from "../../utils/BurgerPropTypes.jsx";
import {useDispatch} from 'react-redux'
import Style from "../Stuffing/Stuffing.module.css";
import { orderContext } from "../../contexts/orderContext.jsx";

function Stuffing({ el }) {
  const { dispatch } = React.useContext(orderContext);
  React.useEffect(() => {
    dispatch({ type: "push", payload: el.price });
  }, []);
  const dispatching = useDispatch();
 function handleClose() {
  dispatching({type: 'REMOVE_CONSTRUCTOR_ELEMENT', payload: el._id })
  dispatch({type: 'remove', payload: el.price});
 }


  return (
    <div className={`${Style.stuffingBar}`}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={el.name}
        price={el.price}
        thumbnail={el.image_mobile}
        handleClose={handleClose}
      />
    </div>
  );
}

Stuffing.propTypes = {
  el: burgerProps.isRequired,
};

export default Stuffing;
