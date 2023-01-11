import React, { Component, useState, useEffect, useRef, useMemo } from "react";
import Style from "../FeedDetailsHistory/FeedDetailsHistory.module.css";
import {useSelector} from "../../utils/types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import FeedDetailsIngredient from "../FeedDetailsIngredient/FeedDetailsIngredient";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {date} from '../../utils/date';
import { TOrders } from "../../utils/types";

interface IFeedDetailsHistorProps {
  data: any;
}

const FeedDetailsHistory:React.FC<IFeedDetailsHistorProps> = ({ data }) => {
  const allIngredients = useSelector(
    (state) => state.ingredientReducer.allIngredients
  );
  const ingredients = data.ingredients;
  const price = useMemo(() => {
    if (ingredients != null && allIngredients != null) {
      return ingredients
        .map((el:any) => {
          return allIngredients.find((e:any) => e._id == el);
        })
        .map((el:any) => el.price)
        .reduce((x: number, y: number): number => x + y, 0);
    }
  }, [allIngredients, ingredients]);

  const { id } = useParams<any>();
  const allOrders = useSelector((state) => state.wsReducer.allOrders);
  const [items, sets] = useState({
    _id: "",
    ingredients: [],
    name: "",
    number: "",
    status: "",
    updatedAt: "",
    createdAt: "",
    counter: [],
  });

  const all = useMemo(() => {
    if (allOrders.length !== 0) {
      return allOrders.orders.find((el: any) => el._id === id);
    }
  }, [allOrders, allIngredients, items]);
  useEffect(() => {
    if (!!all) {
      const ingredient = all.ingredients;
      const alls: any = new Set(ingredient);
      sets({
        _id: all._id,
        ingredients: alls,
        name: all.name,
        number: all.number,
        status: all.status,
        updatedAt: all.updatedAt,
        createdAt: all.createdAt,
        counter: ingredient,
      });
    }
  }, [all]);
  return (
<div className={Style.container}>
      <p className={`${Style.number} text text_type_digits-default`}>
        &#35;{items.number}
      </p>
      <div>
        <p className={`text text_type_main-medium`}>{items.name}</p>
        <p className={`${Style.status} text text_type_main-small`}>
          {items.status == 'done' ? 'выполнено' : items.status == 'pending' ? 'в работе' : null}
        </p>
      </div>
      <div>
        <p className={`text text_type_main-medium`}>Состав:</p>
        <ul className={Style.ordersContainer}>
          {items.ingredients != null &&
            items.counter != null &&
            items.ingredients.map((item) => {
              const ingredient = allIngredients.find((el) => el._id === item);
              return (
                <FeedDetailsIngredient
                  key={uuidv4()}
                  amount={items.counter}
                  data={ingredient}
                />
              );
            })}
        </ul>
      </div>

      <div className={Style.PriceContainer}>
        <p
          className={`${Style.time} text text_type_main-default text_color_inactive`}
        >
          {date(items.createdAt)}
        </p>
        <div className={Style.totalPriceContainer}>
          <p className={`${Style.totalPrice} text text_type_digits-default`}>
            {price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>

  )
    

}

export default FeedDetailsHistory;
