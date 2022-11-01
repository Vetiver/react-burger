import { applyMiddleware, compose, combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { orderReducer } from "../reducers/orderReducer.jsx";
import { profileReducer } from "../reducers/profileReducer.jsx";
import { ingredientReducer } from "../reducers/ingredientReducer.jsx";
import { socketMiddleware } from "../socketMiddleware/socketMiddleware.jsx";
import { wsReducer } from "../reducers/wsReducer.jsx";
import thunk from "redux-thunk";
import thunkmiddleware from "redux-thunk";
import { wsActions } from "../actions/wsActions.jsx";

const wsUrl = "wss://norma.nomoreparties.space/orders";

const reduсers = combineReducers({
  orderReducer: orderReducer,
  profileReducer: profileReducer,
  ingredientReducer: ingredientReducer,
  wsReducer: wsReducer,
});

const state = {};
export const store = configureStore({
  reducer: reduсers,
  middleware: (thunkmiddleware) =>
    thunkmiddleware({ serializableCheck: false }).concat(
      socketMiddleware(wsUrl, wsActions)
    ),
  state,
  devTools: true,
});
