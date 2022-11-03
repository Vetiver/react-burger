import React, { useEffect, useRef } from "react";
import Style from "../BurgerIngredients/BurgerIngredients.module.css";
import "../Tab/Tab.jsx";
import Ingredient from "../Ingredient/Ingredient.jsx";
import Tabs from "../Tab/Tab.jsx";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function BurgerIngredients() {
  const location = useLocation();
  const bunRef = useRef();
  const sauseRef = useRef();
  const mainRef = useRef();
  const ingredients = useSelector(
    (state) => state.ingredientReducer.allIngredients
  );
  const bun = ingredients.filter((el) => el.type === "bun");
  const main = ingredients.filter((el) => el.type === "main");
  const sauce = ingredients.filter((el) => el.type === "sauce");

  return (
    <section className={`${Style.burgerCatalog}`}>
      <h2 className={`${Style.title} text text_type_main-large`}>
        Соберите бургер
      </h2>
      <Tabs bunRef={bunRef} sauseRef={sauseRef} mainRef={mainRef} />
      <div id="scrollBar" className={`${Style.chapter}`}>
        <h3
          ref={bunRef}
          className={`${Style.title} text text_type_main-medium`}
        >
          Булки
        </h3>
        <div className={`${Style.burgerGrid}`}>
          {bun.map((el) => {
            return (
              <Link
                className={`${Style.link}`}
                key={el._id}
                to={{
                  pathname: `ingredients/${el._id}`,
                  state: {
                    background: location,
                  },
                }}
              >
                <Ingredient ingredient={el} key={el._id} />
              </Link>
            );
          })}
        </div>
        <h3 className={`${Style.title} text text_type_main-medium`}>Соусы</h3>
        <div ref={sauseRef} className={`${Style.burgerGrid}`}>
          {sauce.map((el) => {
            return (
              <Link
                className={`${Style.link}`}
                key={el._id}
                to={{
                  pathname: `ingredients/${el._id}`,
                  state: {
                    background: location,
                  },
                }}
              >
                <Ingredient ingredient={el} key={el._id} />
              </Link>
            );
          })}
        </div>
        <h3
          ref={mainRef}
          className={`${Style.title} text text_type_main-medium`}
        >
          Начинки
        </h3>
        <div className={`${Style.burgerGrid}`}>
          {main.map((el) => {
            return (
              <Link
                className={`${Style.link}`}
                key={el._id}
                to={{
                  pathname: `ingredients/${el._id}`,
                  state: {
                    background: location,
                  },
                }}
              >
                <Ingredient ingredient={el} key={el._id} />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default BurgerIngredients;
