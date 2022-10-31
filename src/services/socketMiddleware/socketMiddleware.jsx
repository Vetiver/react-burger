export const socketMiddleware = wsUrl => {
    return store => {
        let socket = null;

    return next => action => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      if (type === 'WS_CONNECTION_START') {
          if (socket == null) {
            socket = new WebSocket(`${wsUrl}${payload.add}`);
          } else if (socket.readyState == 3 || socket.readyState == 2) {
            socket = new WebSocket(`${wsUrl}${payload.add}`);
          }
      }
      if (socket) {

                // функция, которая вызывается при открытии сокета
        socket.onopen = event => {
          dispatch({ type: 'WS_CONNECTION_SUCCESS', payload: event });
        };

                // функция, которая вызывается при ошибке соединения
        socket.onerror = event => {
          dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });
        };

                // функция, которая вызывается при получении события от сервера
        socket.onmessage = event => {
          const { data } = event;
          const parse = JSON.parse(data)
          const {success, ...parsedData} = parse;
          dispatch({ type: 'WS_GET_MESSAGE', payload: parsedData });
        };
                // функция, которая вызывается при закрытии соединения
        socket.onclose = event => {
          dispatch({ type: 'WS_CONNECTION_CLOSED', payload: event });
        };

        // if (type === 'WS_SEND_MESSAGE') {
        //   const message = payload;
        //             // функция для отправки сообщения на сервер
        //   socket.send(JSON.stringify(message));
        // }
      }

      next(action);
    };
    };
};