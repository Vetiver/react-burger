import React, { Component, useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Style from "../IngredientDetails/IngredientDetails.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getItems } from "../../services/actions/ingredients.jsx";

function IngredientDetails() {
  const allIngredients = useSelector((state) => state.ingredientReducer.allIngredients);
  console.log(allIngredients)
  const [items, sets] = useState({
    image: "",
    name: "",
    calories: "",
    proteins: "",
    fat: "",
    carbohydrates: "",
  });
  
  const { id } = useParams()
  useEffect(() => {
    if (allIngredients.length) {
      const main = allIngredients.find((el) => el._id === id);
      if(main) {
              sets({
        image: main.image_large,
        name: main.name,
        calories: main.calories,
        proteins: main.proteins,
        fat: main.fat,
        carbohydrates: main.carbohydrates,
      });
      }

    }
  }, [allIngredients]);
  return (
    <>
      <p className={`${Style.title} text text_type_main-large`}>
        Детали ингредиента
      </p>
      <img src={items.image} alt={items.name} />
      <p className="text text_type_main-medium">{items.name}</p>
      <div className={`${Style.info}`}>
        <div className={`${Style.column}`}>
          <p className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {items.calories}
          </p>
        </div>
        <div className={`${Style.column}`}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {items.proteins}
          </p>
        </div>
        <div className={`${Style.column}`}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {items.fat}
          </p>
        </div>
        <div className={`${Style.column}`}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {items.carbohydrates}
          </p>
        </div>
      </div>
    </>
  );
}

export default IngredientDetails;
