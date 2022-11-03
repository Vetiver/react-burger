import React, { memo } from "react";
import Styles from "../OrderFeedStats/OrderFeedStats.module.css";
import { useSelector } from "react-redux";

function OrderFeedStats({ data }) {
  return (
    !!data.orders && (
      <div className={Styles.container}>
        <div className={Styles.orderIsReady}>
          <h2 className={`${Styles.title} "text text_type_main-medium"`}>
            Готовы:
          </h2>
          <div
            className={`${Styles.readyOrders} text text_type_digits-default`}
          >
            {data.orders != null &&
              data.orders
                .filter((el) => el.status === "done")
                .map((el) => {
                  return <p key={el.number}>{el.number}</p>;
                })}
          </div>
        </div>
        <div className={Styles.orderInProcess}>
          <h2 className={`${Styles.title} "text text_type_main-medium"`}>
            В работе:
          </h2>
          <div className={`${Styles.inProcess} text text_type_digits-default`}>
            {data.orders != null &&
              data.orders
                .filter((el) => el.status === "pending")
                .map((el) => {
                  return <p key={el.number}>{el.number}</p>;
                })}
          </div>
        </div>
        <div className={Styles.executedOrders}>
          <h2 className={`${Styles.title} "text text_type_main-medium"`}>
            Выполнено за все время:
          </h2>
          <p className={`${Styles.executedOrders} text text_type_digits-large`}>
            {data?.total}
          </p>
        </div>
        <div className={Styles.executedTodayContainer}>
          <h2 className={`${Styles.title} "text text_type_main-medium"`}>
            Выполнено за сегодня:
          </h2>
          <p className={`${Styles.executedOrders} text text_type_digits-large`}>
            {data?.totalToday}
          </p>
        </div>
      </div>
    )
  );
}

export default memo(OrderFeedStats);
