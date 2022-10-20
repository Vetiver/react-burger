import React, { Component, useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Style from "../IngredientDetailsModal/IngredientDetailsModal.module.css";
import { fetchIngredients } from "../../services/actions/ingredients";
import {useSelector } from "react-redux";
import {useParams} from "react-router";


function IngredientDetailsModal() {
  const allIngredients = useSelector((state) => state.allIngredients);
  const isLogin = useSelector((state) => state.isLogin);
  const [items, sets] = useState({
    image: "",
    name: "",
    calories: "",
    proteins: "",
    fat: "",
    carbohydrates: "",
  });
  const {id} = useParams()
  const takeModal = async () => {
    const data = await fetchIngredients().then((data) => data);
    if (isLogin === true) {
      const main = allIngredients.find((el) => el._id === id);

      sets({
        image: main.image_large,
        name: main.name,
        calories: main.calories,
        proteins: main.proteins,
        fat: main.fat,
        carbohydrates: main.carbohydrates,
      });
    } else if (isLogin === false) {

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
  }, []);
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

export default IngredientDetailsModal;
