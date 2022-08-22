import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {burgerProps} from "../../utils/BurgerPropTypes.jsx";
import Style from '../IngredientDetails/IngredientDetails.module.css';


function IngredientDetails({ arr }) {
  return (
    <>
     <p className={`${Style.title} text text_type_main-large`}>Детали ингредиента</p>
		 <img src={arr.image_large} alt='' /> 
		 <p className="text text_type_main-medium">{arr.name}</p>
		 <div className={`${Style.info}`}>
			<div className={`${Style.column}`}>
			<p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
			<p className="text text_type_main-default text_color_inactive">{arr.calories}</p>
			</div>
			<div className={`${Style.column}`}>
			<p className="text text_type_main-default text_color_inactive">Белки, г</p>
			<p className="text text_type_main-default text_color_inactive">{arr.proteins}</p>
			</div>
			<div className={`${Style.column}`}>
			<p className="text text_type_main-default text_color_inactive">Жиры, г</p>
			<p className="text text_type_main-default text_color_inactive">{arr.fat}</p>
			</div>
			<div className={`${Style.column}`}>
			<p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
			<p className="text text_type_main-default text_color_inactive">{arr.carbohydrates}</p>
			</div>
		 </div>
    </>
  );
}

IngredientDetails.propTypes = {
	arr: burgerProps.isRequired,
  }; 

export default IngredientDetails;