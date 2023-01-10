import React, { useEffect } from "react";
import Styles from "../../pages/FeedOrder/FeedOrder.module.css";
import OrderFeedStats from "../../components/OrderFeedStats/OrderFeedStats";
import Orders from "../Orders/Orders";
import { WS_CONNECTION_START } from "../../services/actions/wsActions";
import { WS_CONNECTION_CLOSED } from "../../services/reducers/wsReducer";
import { useTDispatch, useSelector, TLocation } from "../../utils/types";

const FeedOrder = () => {
  const allOrders = useSelector((state) => state.wsReducer.allOrders);
  const dispatch = useTDispatch();
  useEffect(() => {
    dispatch({ type: WS_CONNECTION_CLOSED })
    dispatch({
      type: WS_CONNECTION_START,
      payload: {
        add: "/all",
      },
    });
  }, []);
  return (
    !!allOrders && (
      <div className={Styles.mainContainer}>
        <h1 className={`${Styles.title} text text_type_main-large`}>
          Лента заказов
        </h1>
        <div className={Styles.container}>
          <Orders orders={allOrders}></Orders>
          <OrderFeedStats data={allOrders}></OrderFeedStats>
        </div>
      </div>
    )
  );
}

export default FeedOrder;
