import React, { useCallback, useState, useEffect } from "react";
import Style from "../../pages/Orders/Orders.module.css";
import FeedOrderCard from "../../components/FeedOrderCard/FeedOrderCard";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SET_ORDER } from "../../services/actions/profile";
import { useTDispatch, TLocation, TWs } from "../../utils/types";

interface IOrdersProps {

    orders: Array<TWs>;

}

const Orders: React.FC<IOrdersProps> = ({ orders }) => {
  const location = useLocation<TLocation>();
  const dispatch = useTDispatch();
  const setOrder = useCallback((e: React.SyntheticEvent): void => {
    dispatch({ type: SET_ORDER, payload: e });
  }, []);

  return (
    <section className={Style.container}>
      <div className={` ${Style.containerCard} custom-scroll`} id="scroll">
        {orders != null &&
          orders.map((el) => {
            return (
              <Link
                className={`${Style.link}`}
                key={el._id}
                to={{
                  pathname: `${location.pathname}/${el._id}`,
                  state: {
                    background: location,
                  },
                }}
              >
                <FeedOrderCard data={el} key={el._id} onClick={setOrder} />
              </Link>
            );
          })}
      </div>
    </section>
  );
};

export default Orders;
