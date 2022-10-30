import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppHeader from "../App-header/App-header";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Style from "../App/App.module.css";
import { BurgerContext } from "../../contexts/BurgerContext.jsx";
import checkResponse from "../../utils/checkResponse.jsx";
import {useDispatch, useSelector} from 'react-redux';

function App() {
  return (
    <Router>
    <div className={Style.App}>
      <AppHeader />
      <main className={Style.container}>
        <DndProvider backend = {HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </ DndProvider>
      </main>
    </div>
    </Router>
  );
}

export default App;
