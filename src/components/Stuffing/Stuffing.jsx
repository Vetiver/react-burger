import React from "react";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { burgerProps } from "../../utils/BurgerPropTypes.jsx";
import {useDispatch} from 'react-redux'
import Style from "../Stuffing/Stuffing.module.css";
import { orderContext } from "../../contexts/orderContext.jsx";
import { useMotionValue, Reorder } from "framer-motion";


function Stuffing({ el }) {
  const y = useMotionValue(0);
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
    <Reorder.Item style={{ y }} key={el} value={el}>
    <div className={`${Style.stuffingBar}`}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={el.name}
        price={el.price}
        thumbnail={el.image_mobile}
        handleClose={handleClose}
      />
    </div>
    </Reorder.Item>
  );
}

Stuffing.propTypes = {
  el: burgerProps.isRequired,
};

export default Stuffing;
