import React from 'react';
import ReactDOM from 'react-dom';
import Style from '../IngredientDetails/IngredientDetails.module.css';


function IngredientDetails(props) {
  return (
    <>
     <p className={`${Style.title} text text_type_main-large`}>Детали ингредиента</p>
		 <img src={props.arr.image_large} alt='' /> 
		 <p className="text text_type_main-medium">{props.arr.name}</p>
		 <div className={`${Style.info}`}>
			<div className={`${Style.column}`}>
			<p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
			<p className="text text_type_main-default text_color_inactive">{props.arr.calories}</p>
			</div>
			<div className={`${Style.column}`}>
			<p className="text text_type_main-default text_color_inactive">Белки, г</p>
			<p className="text text_type_main-default text_color_inactive">{props.arr.proteins}</p>
			</div>
			<div className={`${Style.column}`}>
			<p className="text text_type_main-default text_color_inactive">Жиры, г</p>
			<p className="text text_type_main-default text_color_inactive">{props.arr.fat}</p>
			</div>
			<div className={`${Style.column}`}>
			<p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
			<p className="text text_type_main-default text_color_inactive">{props.arr.carbohydrates}</p>
			</div>
		 </div>
    </>
  );
}

export default IngredientDetails;