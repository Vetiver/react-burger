export const WS_CONNECTION_START = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS = "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR = "WS_CONNECTION_ERROR";
export const WS_GET_MESSAGE = "WS_GET_MESSAGE";
export const WS_CONNECTION_CLOSED = "WS_CONNECTION_CLOSED";

type TWsState = {
  allOrders: Array<string>;
  wsConnected: boolean;
  error: any;
};

const initialState = {
  allOrders: [],
  wsConnected: false,
  error: undefined,
};

export interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
}

export interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsConnectionFailed {
  readonly type: typeof  WS_CONNECTION_ERROR;
  payload: string;
}

export interface IWsGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  payload: any;
}

export interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
  payload: string;
}



type TWsActions =
IWsConnectionStart
  | IWsConnectionSuccess
  | IWsConnectionFailed
  | IWsGetMessage
  | IWsConnectionClosed

export const wsReducer = (state = initialState, action: TWsActions): TWsState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    // Опишем обработку экшена с типом WS_CONNECTION_CLOSED, когда соединение закрывается
    // Установим флаг wsConnected в состояние false
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };

    // Опишем обработку экшена с типом WS_GET_MESSAGE
    // Обработка происходит, когда с сервера возвращаются данные
    // В messages передадим данные, которые пришли с сервера
    case WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        allOrders: action.payload,
      };
    default:
      return state;
  }
};
