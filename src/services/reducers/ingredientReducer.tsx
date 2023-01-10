import { TIngredients } from "../.././utils/types";


export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const ADD_BUN_ELEMENT = "ADD_BUN_ELEMENT";
export const ADD_CONSTRUCTOR_ELEMENT = "ADD_CONSTRUCTOR_ELEMENT";
export const REMOVE_CONSTRUCTOR_ELEMENT = "REMOVE_CONSTRUCTOR_ELEMENT";
export const ADD_PRICE = "ADD_PRICE";
export const REMOVE_PRICE = "REMOVE_PRICE";

type TIngridientsState = {
  allIngredients: ReadonlyArray<TIngredients>;
  IngredientsRequest: boolean;
  IngredientsFailed: boolean;
  orderNumber: null | number;
  orderRequest: boolean;
  orderFailed: boolean;
  buns: Array<TIngredients>;
  mainPrice: number;
  constructorIngredients: [] | Array<TIngredients>;
};

const initialState: TIngridientsState = {
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

export interface IGetIngreientRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  payload: ReadonlyArray<TIngredients>;
}

export interface IGetIngredientFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IAddBunElement {
  readonly type: typeof ADD_BUN_ELEMENT;
  payload: TIngredients;
}

export interface IAddConstructorElement {
  readonly type: typeof ADD_CONSTRUCTOR_ELEMENT;
  payload: TIngredients;
}

export interface IRemoveConstructorElement {
  readonly type: typeof REMOVE_CONSTRUCTOR_ELEMENT;
  payload: number | string;
}

export interface IAddPrice {
  readonly type: typeof ADD_PRICE;
  payload: number;
}

export interface IRemovePrice {
  readonly type: typeof REMOVE_PRICE;
  payload: number;
}

type TIngredientsActions =
  IGetIngreientRequest
  | IGetIngredientSuccess
  | IGetIngredientFailed
  | IAddBunElement
  | IAddConstructorElement
  | IRemoveConstructorElement 
  | IAddPrice
  | IRemovePrice 

export const ingredientReducer = (
  state = initialState,
  action: TIngredientsActions
): TIngridientsState => {
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
