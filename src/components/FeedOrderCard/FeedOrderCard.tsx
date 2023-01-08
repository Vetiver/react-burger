import React, { useEffect, useState, useMemo } from "react";
import Styles from "../FeedOrderCard/FeedOrderCard.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {SET_VISIBLE } from "../../services/actions/profile";
import { SET_ORDER } from "../../services/actions/profile";
import { v4 as uuidv4 } from "uuid";
import {date} from '../../utils/date.jsx';
import { useTDispatch, useSelector, TLocation } from "../../utils/types";

interface IFeedDetailsIngredientProps {
  data: any
}

const FeedOrderCard:React.FC<IFeedDetailsIngredientProps> =({ data }) => {
  const allIngredients = useSelector(
    (state) => state.ingredientReducer.allIngredients
  );
  const allOrders = useSelector((state) => state.wsReducer.allOrders);
  const ingredients = data.ingredients;
  const price = useMemo(() => {
    return ingredients
      .map((el:string) => {
        return allIngredients.find((e: any) => e._id == el);
      })
      .map((el:any) => el.price)
      .reduce((x: number, y: number) => x + y, 0);
  }, []);

  const dispatch = useTDispatch();
  function handleOpenModal() {
    dispatch({ type: SET_VISIBLE });
    dispatch({ type: SET_ORDER, payload: data });
  }
  return (
    !!allOrders && (
      <div onClick={handleOpenModal} className={Styles.container}>
        <p className={`${Styles.number} text text_type_digits-default`}>
          &#35;{data.number}
        </p>
        <p
          className={`${Styles.createdAt} text text_type_main-default text_color_inactive`}
        >
          {date(data.createdAt.toString())}
        </p>
        <p className={`${Styles.name} text text_type_main-medium`}>
          {data.name}
        </p>
        <ul className={Styles.ingredients}>
          {ingredients.slice(0, 4).map((item: any) => {
            const ingredientImage = allIngredients.find(
              (el: any) => el._id === item
            )?.image;
            return (
              <li key={uuidv4()} className={Styles.ingredient}>
                <div className={Styles.ingredientBackground}>
                  <img
                    className={Styles.ingredientImage}
                    src={ingredientImage}
                    alt="image1"
                  />
                </div>
              </li>
            );
          })}
          {ingredients.length > 5
            ? ingredients.slice(3, 4).map((item: any) => {
                const ingredientImage = allIngredients.find(
                  (el: any) => el._id === item
                )?.image;
                return (
                  <li key={uuidv4()} className={Styles.ingredient}>
                    <div className={Styles.ingredientBackground}>
                      <img
                        className={`${Styles.ingredientImage} ${Styles.hover}`}
                        src={ingredientImage}
                        alt="image1"
                      />
                      <p
                        className={`${Styles.absoluteLength} text text_type_digits-default`}
                      >
                        +{ingredients.slice(5).length}
                      </p>
                    </div>
                  </li>
                );
              })
            : null}
        </ul>

        <div className={Styles.priceContainer}>
          <p className={`${Styles.price} text text_type_digits-default`}>
            {price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    )
  );
}

export default FeedOrderCard;
