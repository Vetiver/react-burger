import React from "react";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import Style from "../Stuffing/Stuffing.module.css";
import { useTDispatch, TLocation } from "../../utils/types";
import { useMotionValue, Reorder } from "framer-motion";

interface IStuffingProps {
  el: {
    uuid: string;
    price: number;
    name: string;
    image_mobile: string;
  }
}

const Stuffing: React.FC<IStuffingProps> = ({ el }) => {
  const y = useMotionValue(0);
  const dispatching = useTDispatch();
  function handleClose() {
    dispatching({ type: "REMOVE_CONSTRUCTOR_ELEMENT", payload: el.uuid });
    dispatching({ type: "REMOVE_PRICE", payload: el.price });
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


export default Stuffing;
