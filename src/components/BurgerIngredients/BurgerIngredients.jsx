import React, { Component, useState, useEffect } from "react";
import { ReactDOM } from "react";
import { getItems } from "../../services/actions/order";
import {useDispatch, useSelector} from 'react-redux';
import Style from "../BurgerIngredients/BurgerIngredients.module.css";
import "../Tab/Tab.jsx";
import Ingredient from "../Ingredient/Ingredient.jsx";
import Tabs from "../Tab/Tab.jsx";

function BurgerIngredients() {
  const ingredients = useSelector(state => state.allIngredients);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getItems())
  },[])
 

  const bun = ingredients.filter((el) => el.type === "bun");
  const main = ingredients.filter((el) => el.type === "main");
  const sauce = ingredients.filter((el) => el.type === "sauce");
  return (
    <section className={`${Style.burgerCatalog}`}>
      <h2 className={`${Style.title} text text_type_main-large`}>
        Соберите бургер
      </h2>
      <Tabs />
      <div className={`${Style.chapter}`}>
        <h3  className={`${Style.title} text text_type_main-medium`}>Булки</h3>
        <div id='bun' className={`${Style.burgerGrid}`}>
          {bun.map(function (el) {
            return <Ingredient ingredient={el} key={el._id} />;
          })}
        </div>
        <h3 className={`${Style.title} text text_type_main-medium`}>Соусы</h3>
        <div id='sauses' className={`${Style.burgerGrid}`}>
          {sauce.map(function (el) {
            return <Ingredient ingredient={el} key={el._id} />;
          })}
        </div>
        <h3 id='main' className={`${Style.title} text text_type_main-medium`}>Начинки</h3>
        <div  className={`${Style.burgerGrid}`}>
          {main.map(function (el) {
            return <Ingredient ingredient={el} key={el._id} />;
          })}
        </div>
      </div>
    </section>
  );
}

/*BurgerIngredients.propTypes = {
  arr:  PropTypes.arrayOf(PropTypes.object).isRequired,
}; */

export default BurgerIngredients;
