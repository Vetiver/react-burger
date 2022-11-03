import React, { useEffect, useState, useMemo } from "react";
import Styles from "../FeedOrderCard/FeedOrderCard.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { infoUserData, SET_VISIBLE } from "../../services/actions/profile.jsx";
import { SET_ORDER } from "../../services/actions/profile.jsx";
import { v4 as uuidv4 } from "uuid";
import {date} from '../../utils/date.jsx';
function FeedOrderCard({ data }) {
  const allIngredients = useSelector(
    (state) => state.ingredientReducer.allIngredients
  );
  const allOrders = useSelector((state) => state.wsReducer.allOrders);
  const ingredients = data.ingredients;
  const price = useMemo(() => {
    return ingredients
      .map((el) => {
        return allIngredients.find((e) => e._id == el);
      })
      .map((el) => el.price)
      .reduce((x, y) => x + y, 0);
  }, []);

  const dispatch = useDispatch();
  function handleOpenModal(e) {
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
          {ingredients.slice(0, 4).map((item) => {
            const ingredientImage = allIngredients.find(
              (el) => el._id === item
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
            ? ingredients.slice(3, 4).map((item) => {
                const ingredientImage = allIngredients.find(
                  (el) => el._id === item
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
