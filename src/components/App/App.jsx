import React, { useEffect, useState } from "react";
import AppHeader from "../App-header/App-header";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Style from "../App/App.module.css";
import { BurgerContext } from "../../contexts/BurgerContext.jsx";
import checkResponse from "../../utils/checkResponse.jsx";
import {useDispatch, useSelector} from 'react-redux';

function App() {
  return (
    <div className={Style.App}>
      <AppHeader />
      <main className={Style.container}>
          <BurgerIngredients />
          <BurgerConstructor />
      </main>
    </div>
  );
}

export default App;
