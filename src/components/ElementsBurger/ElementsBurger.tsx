import React from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import Style from "../ElementsBurger/ElementBurger.module.css";
import { TIngredients } from "../../utils/types";

interface IElementBurgerProps {
  bun: Array<TIngredients>;
  children: React.ReactNode;
  bunTarget: string;
}
export const ElementBurger: React.FC<IElementBurgerProps> = ({ bun, children, bunTarget }) => {
  return (
    <div ref={bunTarget} className={`${Style.element}`}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text={`${bun[0].name} (верх)`}
        price={bun[0].price}
        thumbnail={bun[0].image_mobile}
      />
      {children}
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${bun[0].name} (низ)`}
        price={bun[0].price}
        thumbnail={bun[0].image_mobile}
      />
    </div>
  );
}

