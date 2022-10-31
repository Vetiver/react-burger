import { applyMiddleware, compose } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { reducer } from '../reducers/orderReducer.jsx';
import { socketMiddleware } from '../socketMiddleware/socketMiddleware.jsx';
import thunk from 'redux-thunk';
import thunkmiddleware from "redux-thunk";
import { wsActions } from '../actions/wsActions.jsx';

const wsUrl = 'wss://norma.nomoreparties.space/orders';

const state = {}
export const store = configureStore({reducer: reducer,
   middleware: (thunkmiddleware)=> thunkmiddleware({serializableCheck: false,})
  .concat(socketMiddleware(wsUrl, wsActions)),
  state,
  devTools: true,
})