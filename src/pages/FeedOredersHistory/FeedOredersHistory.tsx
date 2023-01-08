import React, { useEffect } from "react";
import Styles from "../../pages/FeedOredersHistory/FeedOredersHistory.module.css";
import Orders from "../Orders/Orders";
import { WS_CONNECTION_START } from "../../services/actions/wsActions";
import { WS_CONNECTION_CLOSED } from "../../services/reducers/wsReducer";
import NavBar from "../../components/NavBar/NavBar";
import { getCookie } from "../../utils/cookie.jsx";
import { useTDispatch, useSelector, TLocation } from "../../utils/types";

const FeedOrdersHistory = () => {
  const allOrders = useSelector((state) => state.wsReducer.allOrders);
  const dispatch = useTDispatch();
  useEffect(() => {
    dispatch({ type: WS_CONNECTION_CLOSED })
    dispatch({
      type: WS_CONNECTION_START,
      payload: {
        add: `?token=${getCookie("token").split(" ")[1]}`,
      },
    });
  }, []);
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
