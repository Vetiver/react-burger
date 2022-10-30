import React, { useEffect } from "react";
import Styles from "../../pages/FeedOredersHistory/FeedOredersHistory.module.css";
import OrderFeedStats from "../../components/OrderFeedStats/OrderFeedStats";
import Orders from "../Orders/Orders";
import {WS_CONNECTION_START} from '../../services/actions/wsActions';
import { useDispatch, useSelector } from 'react-redux';
import { WS_CONNECTION_CLOSED } from "../../services/reducers/orderReducer";
import NavBar from '../../components/NavBar/NavBar.jsx';

function FeedOrdersHistory() {
  const allOrders = useSelector(state => state.allOrders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: {
        add: ''
      }
    })
    return () => {
      dispatch({type: WS_CONNECTION_CLOSED})}
  },[])
  console.log(allOrders)
  return (
    !!allOrders && (
      <div className={Styles.container}>
      <NavBar /> 
      <Orders data={allOrders} />
    </div>
    )
    );
}

export default FeedOrdersHistory;
