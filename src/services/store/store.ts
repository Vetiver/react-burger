import { applyMiddleware, compose, combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { orderReducer } from "../reducers/orderReducer";
import { profileReducer } from "../reducers/profileReducer";
import { ingredientReducer } from "../reducers/ingredientReducer";
import { socketMiddleware } from "../socketMiddleware/socketMiddleware";
import { wsReducer } from "../reducers/wsReducer";
import thunk from "redux-thunk";
import { wsActions } from "../actions/wsActions";

const wsUrl = "wss://norma.nomoreparties.space/orders";

const reduсers = combineReducers({
  orderReducer: orderReducer,
  profileReducer: profileReducer,
  ingredientReducer: ingredientReducer,
  wsReducer: wsReducer,
});

const preloadedState = {};

export const store = configureStore({
  reducer: reduсers,
  middleware: (thunkmiddleware) =>
    thunkmiddleware({ serializableCheck: false }).concat(
      socketMiddleware(wsUrl, wsActions)
    ),
  preloadedState,
  devTools: true,
});

export type TState = ReturnType<typeof store.getState>;
export type TDispatch = typeof store.dispatch;