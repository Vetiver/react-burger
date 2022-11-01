export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const SET_INGREDIENT = "SET_INGREDIENT";
export const SET_ORDER = "SET_ORDER";
export const ALL_ORDERS = "ALL_ORDERS";
export const HISTORY_ORDERS = "HISTORY_ORDERS";
export const SET_USER_INFO = "SET_USER_INFO";
const initialState = {
  orderNumber: null,
  orderRequest: false,
  orderFailed: false,
  ingredient: {},
  orderCard: {},
  allOrders: [],
  historyOrders: [],
};

export const orderReducer = (state = initialState, action) => {
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
    case SET_USER_INFO:
      return {
        ...state,
        userInfoRequest: true,
      };
    default:
      return state;
  }
};
