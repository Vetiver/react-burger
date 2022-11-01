export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const ADD_BUN_ELEMENT = "ADD_BUN_ELEMENT";
export const ADD_CONSTRUCTOR_ELEMENT = "ADD_CONSTRUCTOR_ELEMENT";
export const REMOVE_CONSTRUCTOR_ELEMENT = "REMOVE_CONSTRUCTOR_ELEMENT";
export const ADD_PRICE = "ADD_PRICE";
export const REMOVE_PRICE = "REMOVE_PRICE";


const initialState = {
  allIngredients: [],
  IngredientsRequest: false,
  IngredientsFailed: false,
  orderNumber: null,
  orderRequest: false,
  orderFailed: false,
  buns: [],
  mainPrice: 0,
  constructorIngredients: [],
};

export const ingredientReducer = (state = initialState, action) => {
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

    case ADD_CONSTRUCTOR_ELEMENT: {
      return {
        ...state,
        constructorIngredients: [
          ...state.constructorIngredients,
          action.payload,
        ],
      };
    }
    case ADD_BUN_ELEMENT: {
      return {
        ...state,
        buns: [action.payload],
      };
    }
    case REMOVE_CONSTRUCTOR_ELEMENT:
      const commentId = action.payload;
      return {
        ...state,
        constructorIngredients: state.constructorIngredients.filter(
          (comment) => comment.uuid !== commentId
        ),
      };
    case ADD_PRICE: {
      return { ...state, mainPrice: state.mainPrice + action.payload };
    }
    case REMOVE_PRICE: {
      return { ...state, mainPrice: state.mainPrice - action.payload };
    }
    default:
      return state;
  }
};
