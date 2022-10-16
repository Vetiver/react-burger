import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import AppHeader from "../App-header/App-header";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Authorization from "../Authorization/Authorization.jsx";
import Register from "../Register/Register";
import ResetPassword from "../ResetPassword/ResetPassword";
import Style from "../App/App.module.css";
import FogotPassword from "../ForgotPassword/FogotPassword";
import { ProvideAuth } from '../../services/auth.jsx';
import Profile from "../Profile/Profile.jsx";
import {ProtectedRoute} from "../ProtectedRoute/ProtectedRoute.jsx";
import {useDispatch, useSelector} from 'react-redux';

function App() {
  const location = useLocation();
  const isLogin = useSelector(state => state.isLogin);
  return (
    <ProvideAuth>
    <Router>
      <div className={Style.App}>
        <AppHeader />
        <Switch>
          <ProtectedRoute path="/" isAuth={isLogin} exact={true}>
            <main className={Style.container}>
            <DndProvider backend = {HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
            </ DndProvider>
            </main>
          </ProtectedRoute>
          <ProtectedRoute path="/login" anonymous={true} isAuth={isLogin} exact={true}>
          <main className={Style.container}>
            <Authorization />
          </main>
          </ProtectedRoute>
          <Route path="/register" exact={true}>
          <main className={Style.container}>
            <Register/>
          </ main>
          </Route>
          <Route path="/forgot-password" exact={true}>
          <main className={Style.container}>
            <FogotPassword />
          </main>
          </Route>
          <Route path="/reset-password" exact={true}>
          <main className={Style.container}>
            <ResetPassword />
          </main>
          </Route>
          <ProtectedRoute path="/profile" isAuth={isLogin} exact={true}>
          
            <Profile />
        
          </ProtectedRoute>
        </Switch>
      </div>
    </Router>
    </ProvideAuth>
  );
}

export default App;
