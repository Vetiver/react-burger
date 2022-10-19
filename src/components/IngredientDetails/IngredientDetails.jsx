import React, { Component, useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { burgerProps } from "../../utils/BurgerPropTypes.jsx";
import Style from "../IngredientDetails/IngredientDetails.module.css";
import { fetchIngredients } from "../../services/actions/ingredients";
import { useHistory, useParams } from "react-router";
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';

function IngredientDetails({ ingredient }) {
  const {id} = useParams();
  const allIngredients = useSelector(state => state.allIngredients);
  const isLogin = useSelector(state => state.isLogin);
  const [items, sets] = useState({image:'', name:'', calories:'', proteins:'', fat:'', carbohydrates:''})
  const takeModal = async () => {
    const data = await fetchIngredients().then((data) => data);
    console.log(data);
    if(isLogin === true) {
      const main = allIngredients.find((el) => el._id === ingredient);
      sets({
        image: main.image_large,
        name: main.name,
        calories: main.calories,
        proteins: main.proteins,
        fat: main.fat,
        carbohydrates: main.carbohydrates,
      });
    }
    if(isLogin === false) {
      const main = data.data.find((el) => el._id === id);
      sets({
        image: main.image_large,
        name: main.name,
        calories: main.calories,
        proteins: main.proteins,
        fat: main.fat,
        carbohydrates: main.carbohydrates,
      });
    }
  };
  useEffect(() => {
    takeModal();
  },[])
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
