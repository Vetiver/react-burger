export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const ADD_BUN_ELEMENT = 'ADD_BUN_ELEMENT';
export const ADD_CONSTRUCTOR_ELEMENT = 'ADD_CONSTRUCTOR_ELEMENT';
export const REMOVE_CONSTRUCTOR_ELEMENT = "REMOVE_CONSTRUCTOR_ELEMENT";
export const ADD_PRICE = "ADD_PRICE";
export const REMOVE_PRICE = "REMOVE_PRICE";
export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const SET_USER_INFO = 'SET_USER_INFO';
export const SET_USER_SUCCESS = 'SET_USER_SUCCESS';
export const SET_USER_FAILED = 'SET_USER_FAILED';
export const CLEAN_USER_INFO = 'CLEAN_USER_INFO';
export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';

 const initialState = {
  allIngredients: [],
  IngredientsRequest: false,
  userInfoRequest: false,
  userInfoFaile: false,
  IngredientsFailed: false,
  orderNumber: null,
  orderRequest: false,
  orderFailed: false,
  buns: [],
  mainPrice: 0,
  constructorIngredients: [],
  userInfo: [],
  isLogin: false
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

    case ADD_CONSTRUCTOR_ELEMENT: {
      return {
        ...state,
        constructorIngredients: [
          ...state.constructorIngredients,
          action.payload
        ],
      };
    };
    case ADD_BUN_ELEMENT: {
      return {
        ...state,
        buns: [action.payload],
      };
    };
    case REMOVE_CONSTRUCTOR_ELEMENT: 
    const  commentId = action.payload;
      return {...state, constructorIngredients: state.constructorIngredients.filter(comment => comment.uuid !== commentId)
      };
      case ADD_PRICE: {
        return { ...state, mainPrice: state.mainPrice + action.payload };
      };
      case REMOVE_PRICE: {
        return { ...state, mainPrice: state.mainPrice - action.payload };
      }
      case GET_ORDER_REQUEST:
      return { ...state, orderRequest: true };
    case GET_ORDER_SUCCESS:
      return {
        ...state,
        orderNumber: action.payload,
        orderRequest: false,
        orderFailed: false,
      };
    case GET_ORDER_FAILED:
      return { ...state, orderFailed: true };
    case SET_USER_INFO :
      return {
        ...state, userInfoRequest: true,
      }
    case SET_USER_SUCCESS :
      return {
        ...state, userInfo: action.payload,
      }
    case SET_USER_FAILED :
      return {
        ...state, userInfoFaile: true,
      }
    case CLEAN_USER_INFO :
      return {
        ...state, userInfo: null,
      }
    case USER_LOGIN :
      return {
        ...state, isLogin: true,
      }  
    case USER_LOGOUT :
      return {
        ...state, isLogin: false,
      }  
    
    default:
      return state;
  }
};

