import thunk from 'redux';
import checkResponse from "../../utils/checkResponse.jsx";
const baseUrl = "https://norma.nomoreparties.space";

 const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
 const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
 const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

 const initialState = {
  allIngredients: [],
  IngredientsRequest: false,
  IngredientsFailed: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return { ...state, IngredientsRequest: true };
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        allIngredients: action.payload,
        IngredientsRequest: false,
        IngredientsFailed: false,
      };
    case GET_INGREDIENTS_FAILED:
      return { ...state, IngredientsFailed: true };
    default:
      return state;
  }
};

