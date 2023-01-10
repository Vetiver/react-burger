import {  Middleware, MiddlewareAPI } from "redux";
import { TMiddlewareWSActions } from "../actions/wsActions";
import { TDispatch, RootState } from "../store/store";

export const socketMiddleware = (wsUrl: string, wsActions: TMiddlewareWSActions): Middleware => {
  const CLOSED = 3;
  const CLOSING = 2;
  return (store: MiddlewareAPI<TDispatch, RootState>) => {
    let socket: null | WebSocket = null;
    const { wsInit, onOpen, onError, onClose, onMessage } = wsActions;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      if (type === wsInit) {
        if (socket == null) {
          socket = new WebSocket(`${wsUrl}${payload.add}`);
        } else if (
          socket.readyState == CLOSED ||
          socket.readyState == CLOSING
        ) {
          socket = new WebSocket(`${wsUrl}${payload.add}`);
        }
      }
      if (type === onClose && socket) {
        if (socket.readyState === 1) {
          socket.close();
        }
      }
      if (socket) {
        // функция, которая вызывается при открытии сокета
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        // функция, которая вызывается при получении события от сервера
        socket.onmessage = (event) => {
          const { data } = event;
          const parse = JSON.parse(data);
          const { success, ...parsedData } = parse;
          dispatch({ type: onMessage, payload: parsedData });
        };
        // функция, которая вызывается при закрытии соединения
        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };
      }

      next(action);
    };
  };
};
