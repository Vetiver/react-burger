import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { burgerProps } from "../../utils/BurgerPropTypes.jsx";
import Style from "../IngredientDetails/IngredientDetails.module.css";

function IngredientDetails({ ingredient }) {
  return (
    <>
      <p className={`${Style.title} text text_type_main-large`}>
        Детали ингредиента
      </p>
      <img src={ingredient.image_large} alt="" />
      <p className="text text_type_main-medium">{ingredient.name}</p>
      <div className={`${Style.info}`}>
        <div className={`${Style.column}`}>
          <p className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {ingredient.calories}
          </p>
        </div>
        <div className={`${Style.column}`}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {ingredient.proteins}
          </p>
        </div>
        <div className={`${Style.column}`}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {ingredient.fat}
          </p>
        </div>
        <div className={`${Style.column}`}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {ingredient.carbohydrates}
          </p>
        </div>
      </div>
    </>
  );
}

IngredientDetails.propTypes = {
  ingredient: burgerProps.isRequired,
};

export default IngredientDetails;
