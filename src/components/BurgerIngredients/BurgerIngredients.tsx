import React, { useEffect, useRef } from "react";
import Style from "../BurgerIngredients/BurgerIngredients.module.css";
import Ingredient from "../Ingredient/Ingredient";
import {Tabs} from "../Tab/Tab";
import { Link, useLocation } from "react-router-dom";
import { useTDispatch, useSelector, TLocation } from "../../utils/types";


const BurgerIngredients:React.FC = () => {
  const location = useLocation<TLocation>();
  const bunRef = useRef<HTMLInputElement>(null);
  const sauseRef = useRef<HTMLInputElement>(null);
  const mainRef = useRef<HTMLInputElement>(null);
  const ingredients = useSelector(
    (state) => state.ingredientReducer.allIngredients
  );
  const bun = ingredients.filter((el: any) => el.type === "bun");
  const main = ingredients.filter((el: any) => el.type === "main");
  const sauce = ingredients.filter((el: any) => el.type === "sauce");

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
          {bun.map((el: any) => {
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
          {sauce.map((el: any) => {
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
          {main.map((el: any) => {
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
