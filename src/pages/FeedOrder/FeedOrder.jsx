import React, { useEffect } from "react";
import Styles from "../../pages/FeedOrder/FeedOrder.module.css";
import OrderFeedStats from "../../components/OrderFeedStats/OrderFeedStats";
import Orders from "../Orders/Orders";
import {WS_CONNECTION_START} from '../../services/actions/wsActions';
import { useDispatch, useSelector } from 'react-redux';
import { WS_CONNECTION_CLOSED } from "../../services/reducers/orderReducer";

function FeedOrder() {
  const allOrders = useSelector(state => state.allOrders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: {
        add: '/all'
      }
    })
    return dispatch({type: WS_CONNECTION_CLOSED})
  },[allOrders])
  console.log(allOrders)
  return (
    !!allOrders && (
      <div className={Styles.mainContainer}>
      <h1 className={`${Styles.title} text text_type_main-large`}>
      Лента заказов
    </h1>
      <div className={Styles.container}>
      <Orders data={allOrders}></Orders>
      <OrderFeedStats data={allOrders}></OrderFeedStats>
    </div>
    </div>
    )
    );
}

export default FeedOrder;
