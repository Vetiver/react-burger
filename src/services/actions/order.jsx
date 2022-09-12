import thunk from "redux";
import checkResponce from '../../utils/checkResponse.jsx'
const baseUrl = "https://norma.nomoreparties.space";

 const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
 const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
 const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const fetchIngredients = () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(),
  };

  return fetch(`${baseUrl}/api/ingredients`, requestOptions).then(checkResponce);
}


export function getItems() {
  return function (dispatch) {
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
    });
    
  };
}