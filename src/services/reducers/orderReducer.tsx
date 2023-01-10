import { TOrders, TIngredients } from "../../utils/types";
export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const SET_INGREDIENT = "SET_INGREDIENT";
export const SET_ORDER = "SET_ORDER";
export const ALL_ORDERS = "ALL_ORDERS";
export const HISTORY_ORDERS = "HISTORY_ORDERS";
export const SET_USER_INFO = "SET_USER_INFO";

type TOrderState = {
  allOrders: ReadonlyArray<TOrders>;
  historyOrders: ReadonlyArray<TOrders>;
  ingredient: object;
  orderCard: ReadonlyArray<TOrders>;
  orderNumber: null | number;
  orderRequest: boolean;
  orderFailed: boolean;
};

const initialState: TOrderState = {
  orderNumber: null,
  orderRequest: false,
  orderFailed: false,
  ingredient: {},
  orderCard: [],
  allOrders: [],
  historyOrders: [],
};


export interface IGetOrderRequest {
  readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS;
  payload: null | number;
}

export interface IGetOrderIngredient {
  readonly type: typeof GET_ORDER_FAILED;
}

export interface ISetOrderIngredient {
  readonly type: typeof SET_INGREDIENT;
  payload: ReadonlyArray<TIngredients>;
}

export interface ISetOrder {
  readonly type: typeof SET_ORDER;
  payload: ReadonlyArray<TOrders>;
}

export interface IAllSetOrder {
  readonly type: typeof ALL_ORDERS;
  payload: ReadonlyArray<TOrders>;
}

export interface IGetHistoryOrder {
  readonly type: typeof HISTORY_ORDERS;
  payload: ReadonlyArray<TOrders>;
}

export interface ISetUserInfo {
  readonly type: typeof SET_USER_INFO;
}

type TOrderActions =
IGetOrderRequest
  | IGetOrderSuccess
  | IGetOrderIngredient
  | ISetOrderIngredient
  | ISetOrder
  | IAllSetOrder 
  | IGetHistoryOrder
  | ISetUserInfo 

export const orderReducer = (
  state = initialState,
  action: TOrderActions
): TOrderState => {
  switch (action.type) {
    case ALL_ORDERS:
      return { ...state, allOrders: action.payload };
    case HISTORY_ORDERS:
      return { ...state, historyOrders: action.payload };
    case SET_ORDER:
      return { ...state, orderCard: action.payload };
    case SET_INGREDIENT:
      return { ...state, ingredient: action.payload };
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
    default:
      return state;
  }
};
