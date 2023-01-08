import thunk from "redux";
import checkResponce from "../../utils/checkResponse.jsx";
import { getCookie } from "../../utils/cookie.jsx";
import { TDispatch} from ".././store/store";
import { TIngredients, TRequestOptions } from "../../utils/types.js";
export const baseUrl = "https://norma.nomoreparties.space";
export const ADD_BUN_ELEMENT = "ADD_BUN_ELEMENT";
export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const ADD_PRICE = "ADD_PRICE";
export const ADD_CONSTRUCTOR_ELEMENT = "ADD_CONSTRUCTOR_ELEMENT";
export const REMOVE_CONSTRUCTOR_ELEMENT = "REMOVE_CONSTRUCTOR_ELEMENT";
export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDERS_FAILED";
export const TAKE_ID_MODAL = "TAKE_ID_MODAL";
export const DROP_ID_MODAL = "DROP_ID_MODAL";
export const SET_INGREDIENT = "SET_INGREDIENT";



export const fetchIngredients = () => {
  const requestOptions: TRequestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  return fetch(`${baseUrl}/api/ingredients`, requestOptions).then(
    checkResponce
  );
};

const pushData = (ingredients: Array<TIngredients>) => {
  const  requestOptions: TRequestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("token"),
    },
    body: JSON.stringify({
      ingredients: ingredients,
    }),
  };
  return fetch(`${baseUrl}/api/orders`, requestOptions).then(checkResponce);
};

export function getOrderNumber(ingredients: Array<TIngredients>) {
  return function (dispatch: TDispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    pushData(ingredients)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_ORDER_SUCCESS,
            payload: res.order.number,
          });
        } else {
          dispatch({
            type: GET_ORDER_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function getItems() {
  return function (dispatch: TDispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    fetchIngredients()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            payload: res.data,
          });
        } else {
          dispatch({
            type: GET_INGREDIENTS_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
