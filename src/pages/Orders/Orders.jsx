import React, { useCallback, useState, useEffect } from "react";
import Style from "../../pages/Orders/Orders.module.css";
import FeedOrderCard from "../../components/FeedOrderCard/FeedOrderCard";
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { SET_ORDER } from "../../services/actions/profile.jsx";


function Orders({data}) {
  const location = useLocation();
  const dispatch = useDispatch();
  const allOrders = useSelector(state => state.wsReducer.allOrders);
  console.log(allOrders)

  const setOrder = useCallback(
    (e) => {
      dispatch({ type: SET_ORDER, payload: e})
    },
    []
  );
  
  return (
    <section className={Style.container}>
      <div
        className={` ${Style.containerCard} custom-scroll`}
        id="scroll"
      >
        {data.orders != null &&
        data.orders.map((el) => {
          return(<Link className={`${Style.link}`} key={el._id} to={{
            pathname: `${location.pathname}/${el._id}`, state: {
              background: location,
            },
          }}><FeedOrderCard data={el} key={el._id} onClick={setOrder}/></Link>)
        })}
      </div>
    </section>
  );
}

export default Orders;
