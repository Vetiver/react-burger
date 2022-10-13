import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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


function App() {
  return (
    <ProvideAuth>
    <Router>
      <div className={Style.App}>
        <AppHeader />
        <Switch>
          <Route path="/" exact={true}>
            <main className={Style.container}>
            <DndProvider backend = {HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
            </ DndProvider>
            </main>
          </Route>
          <Route path="/login" exact={true}>
          <main className={Style.container}>
            <Authorization />
          </main>
          </Route>
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
          <Route path="/profile" exact={true}>
          
            <Profile />
        
          </Route>
        </Switch>
      </div>
    </Router>
    </ProvideAuth>
  );
}

export default App;
