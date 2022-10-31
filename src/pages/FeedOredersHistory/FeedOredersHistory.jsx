import React, { useEffect } from "react";
import Styles from "../../pages/FeedOredersHistory/FeedOredersHistory.module.css";
import OrderFeedStats from "../../components/OrderFeedStats/OrderFeedStats";
import Orders from "../Orders/Orders";
import {WS_CONNECTION_START} from '../../services/actions/wsActions';
import { useDispatch, useSelector } from 'react-redux';
import { WS_CONNECTION_CLOSED } from "../../services/reducers/orderReducer";
import NavBar from '../../components/NavBar/NavBar.jsx';
import { getCookie } from '../../utils/cookie.jsx';

function FeedOrdersHistory() {
  const allOrders = useSelector(state => state.allOrders);
  const dispatch = useDispatch();
  const token = getCookie("token")
  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: {
        add: `?token=${getCookie("token").split(" ")[1]}`,
      }
    })
    return dispatch({type: WS_CONNECTION_CLOSED})
  },[allOrders])
  return (
    !!allOrders && (
      <div className={Styles.container}>
      <div>
      <NavBar />
      <p
          className={`${Styles.text} text text_type_main-default text_color_inactive`}
        >
          В этом разделе вы можете просмотреть свою историю заказов
        </p>
        </div>
      <Orders data={allOrders} />
    </div>
    )
    );
}

export default FeedOrdersHistory;
