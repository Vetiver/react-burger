import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AppHeader from "../App-header/App-header";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Authorization from "../Authorization/Authorization.jsx";
import Style from "../App/App.module.css";


function App() {
  return (
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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
