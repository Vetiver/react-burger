import React, { Component, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ReactDOM } from 'react';
import Style from '../BurgerIngredients/BurgerIngredients.module.css';
import '../Tab/Tab.jsx';
import Ingredient from '../Ingredient/Ingredient.jsx';
import Tabs from '../Tab/Tab.jsx';




function BurgerIngredients({ arr }) {
  const bun = arr.filter(el => el.type === 'bun');
  const main = arr.filter(el => el.type === 'main');
  const sauce = arr.filter(el => el.type === 'sauce');
  return (
    <section className={`${Style.burgerCatalog}`}>
      <h2 className={`${Style.title} text text_type_main-large`}>Соберите бургер</h2>
      <Tabs />
      <div className={`${Style.chapter}`}>
        <h3 className={`${Style.title} text text_type_main-medium`}>Булки</h3>
        <div className={`${Style.burgerGrid}`}>
          {bun.map(function(el) {
            return <Ingredient arr={el} key={el._id} />;
          })}
        </div>
        <h3 className={`${Style.title} text text_type_main-medium`}>Соусы</h3>
        <div className={`${Style.burgerGrid}`}>
          {sauce.map(function(el) {
            return <Ingredient arr={el} key={el._id} />;
          })}
        </div>
        <h3 className={`${Style.title} text text_type_main-medium`}>Начинки</h3>
        <div className={`${Style.burgerGrid}`}>
          {main.map(function(el) {
            return <Ingredient arr={el} key={el._id} />;
        })}
        </div>
      </div>         
    </section>
  );   
}

BurgerIngredients.propTypes = {
  arr:  PropTypes.arrayOf(PropTypes.object).isRequired,
}; 

export default BurgerIngredients;