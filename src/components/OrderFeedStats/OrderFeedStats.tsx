import React from "react";
import Styles from "../OrderFeedStats/OrderFeedStats.module.css";

interface IOrderFeedStatsProps {
    orders?: any;
    total?: number;
    totalToday?: number;
    data:any;
}

const OrderFeedStats = ({
  data,
}: IOrderFeedStatsProps) => {
  return (
    !!data.orders ? (
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
                .filter((el: any) => el.status === "done")
                .map((el: any) => {
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
                .filter((el: any) => el.status === "pending")
                .map((el: any) => {
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
    ) : null
  );
};

export default OrderFeedStats;
