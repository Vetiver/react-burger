import {  Middleware, MiddlewareAPI } from "redux";
import { TMiddlewareWSActions } from "../actions/wsActions";
import { TDispatch, TState } from "../store/store";

export const socketMiddleware = (wsUrl: string, wsActions: TMiddlewareWSActions): Middleware => {
  const CLOSED = 3;
  const CLOSING = 2;
  return (store: MiddlewareAPI<TDispatch, TState>) => {
    let socket: null | WebSocket = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      if (type === "WS_CONNECTION_START") {
        if (socket == null) {
          socket = new WebSocket(`${wsUrl}${payload.add}`);
        } else if (
          socket.readyState == CLOSED ||
          socket.readyState == CLOSING
        ) {
          socket = new WebSocket(`${wsUrl}${payload.add}`);
        }
      }
      if (type === "WS_CONNECTION_CLOSED" && socket) {
        if (socket.readyState === 1) {
          socket.close();
        }
      }
      if (socket) {
        // функция, которая вызывается при открытии сокета
        socket.onopen = (event) => {
          dispatch({ type: "WS_CONNECTION_SUCCESS", payload: event });
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = (event) => {
          dispatch({ type: "WS_CONNECTION_ERROR", payload: event });
        };

        // функция, которая вызывается при получении события от сервера
        socket.onmessage = (event) => {
          const { data } = event;
          const parse = JSON.parse(data);
          const { success, ...parsedData } = parse;
          dispatch({ type: "WS_GET_MESSAGE", payload: parsedData });
        };
        // функция, которая вызывается при закрытии соединения
        socket.onclose = (event) => {
          dispatch({ type: "WS_CONNECTION_CLOSED", payload: event });
        };
      }

      next(action);
    };
  };
};
