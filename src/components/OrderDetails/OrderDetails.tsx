import React from "react";
import Style from "../OrderDetails/OrderDetails.module.css";
import PropTypes from "prop-types";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface IOrderDetailsProps {
  data: number | null;
}

const OrderDetails: React.FC<IOrderDetailsProps> = ({ data }) => {
  return (
    <>
      <p className={`${Style.mainCounter} text text_type_digits-large`}>
        {data}
      </p>
      <p className={`${Style.firstMargin} text text_type_main-medium`}>
        идентификатор заказа
      </p>
      <CheckMarkIcon type="secondary" />
      <p className={`${Style.secondMargin} text text_type_main-default`}>
        Ваш заказ начали готовить
      </p>
      <p className={`${Style.lastMargin} text text_type_main-default`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
}


export default OrderDetails;
