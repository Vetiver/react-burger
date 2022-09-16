import React from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { orderContext } from "../../contexts/orderContext.jsx";
import { useDrop } from "react-dnd";
export default function ElementBurger( {bun, children, bunTarget} ) {
  const { dispatch } = React.useContext(orderContext);
  React.useEffect(() => {
    dispatch({ type: "push", payload: bun[0].price });
  }, []);
  return (
    <div ref={bunTarget}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: "flex-end",
      }}
    >
      <ConstructorElement
        type="top"
        isLocked={true}
        text={bun[0].name}
        price={bun[0].price}
        thumbnail={bun[0].image_mobile}
      />
      {children}
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={bun[0].name}
        price={bun[0].price}
        thumbnail={bun[0].image_mobile}
      />
    </div>
  );
}
