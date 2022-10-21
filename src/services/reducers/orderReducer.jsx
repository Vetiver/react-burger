export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const ADD_BUN_ELEMENT = "ADD_BUN_ELEMENT";
export const ADD_CONSTRUCTOR_ELEMENT = "ADD_CONSTRUCTOR_ELEMENT";
export const REMOVE_CONSTRUCTOR_ELEMENT = "REMOVE_CONSTRUCTOR_ELEMENT";
export const ADD_PRICE = "ADD_PRICE";
export const REMOVE_PRICE = "REMOVE_PRICE";
export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const SET_USER_INFO = "SET_USER_INFO";
export const SET_USER_SUCCESS = "SET_USER_SUCCESS";
export const SET_USER_FAILED = "SET_USER_FAILED";
export const CLEAN_USER_INFO = "CLEAN_USER_INFO";
export const USER_LOGIN = "USER_LOGIN";
export const FETCH_AUTH_REQUEST = "FETCH_AUTH_REQUEST";
export const FETCH_AUTH_ERROR = "FETCH_AUTH_ERROR";
export const USER_LOGOUT = "USER_LOGOUT";
export const IS_OPEN = "IS_OPEN";
export const IS_CLOSE = "IS_CLOSE";
export const TAKE_ID_MODAL = "TAKE_ID_MODAL";
export const DROP_ID_MODAL = "DROP_ID_MODAL";

export const FETCH_REFRESH_TOKEN_REQUEST = "FETCH_REFRESH_TOKEN_REQUEST";
export const FETCH_REFRESH_TOKEN_SUCCESS = "FETCH_REFRESH_TOKEN_SUCCESS";
export const FETCH_REFRESH_TOKEN_ERROR = "FETCH_REFRESH_TOKEN_ERROR";
export const FETCH_USER = "FETCH_USER";

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
  userInfoData: { name: "", email: "" },
  isLogin: false,
  isOpen: false,
  modalInfo: NaN,
  isLoading: false,
  hasError: false,
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
    case FETCH_USER:
      return {
        ...state,
        userInfoData: { name: action.payload.user.name, email: action.payload.user.email },

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
    case SET_USER_INFO:
      return {
        ...state,
        userInfoRequest: true,
      };
    case SET_USER_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
      };
    case SET_USER_FAILED:
      return {
        ...state,
        userInfoFaile: true,
      };
    case CLEAN_USER_INFO:
      return {
        ...state,
        userInfo: null,
      };
    case USER_LOGIN:
      return {
        ...state,
        isLogin: true,
      };
    case FETCH_AUTH_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_AUTH_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    case USER_LOGOUT:
      return {
        ...state,
        isLogin: false,
        userInfo: initialState.userInfo,
        isLoading: false,
      };
    case IS_OPEN:
      return {
        ...state,
        isOpen: true,
      };
    case IS_CLOSE:
      return {
        ...state,
        isOpen: false,
      };
    case TAKE_ID_MODAL:
      return {
        ...state,
        modalInfo: action.payload,
      };
    case DROP_ID_MODAL:
      return {
        ...state,
        modalInfo: NaN,
      };
    default:
      return state;
  }
};
