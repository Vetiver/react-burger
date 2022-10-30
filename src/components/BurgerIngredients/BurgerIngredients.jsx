import React, { Component, useState, useEffect, useRef } from "react";
import { ReactDOM } from "react";
import { getItems } from "../../services/actions/ingredients";
import {useDispatch, useSelector} from 'react-redux';
import Style from "../BurgerIngredients/BurgerIngredients.module.css";
import "../Tab/Tab.jsx";
import Ingredient from "../Ingredient/Ingredient.jsx";
import Tabs from "../Tab/Tab.jsx";

function BurgerIngredients() {
  const bunRef = useRef()
  const sauseRef = useRef()
  const mainRef = useRef()
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
      <Tabs bunRef= {bunRef} sauseRef={sauseRef} mainRef = {mainRef}/>
      <div id='scrollBar' className={`${Style.chapter}`}>
        <h3 ref={bunRef} className={`${Style.title} text text_type_main-medium`}>Булки</h3>
        <div className={`${Style.burgerGrid}`}>
          {bun.map(function (el) {
            return <Ingredient ingredient={el} key={el._id} />;
          })}
        </div>
        <h3 className={`${Style.title} text text_type_main-medium`}>Соусы</h3>
        <div ref={sauseRef} className={`${Style.burgerGrid}`}>
          {sauce.map(function (el) {
            return <Ingredient ingredient={el} key={el._id} />;
          })}
        </div>
        <h3 ref={mainRef} className={`${Style.title} text text_type_main-medium`}>Начинки</h3>
        <div  className={`${Style.burgerGrid}`}>
          {main.map(function (el) {
            return <Ingredient ingredient={el} key={el._id} />;
          })}
        </div>
      </div>
    </section>
  );
}



export default BurgerIngredients;
