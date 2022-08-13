import React from 'react';
import AppHeader from '../App-header/App-header';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Style from "../App/App.module.css";
import mas from '../../utils/Mas.js';



function App() {
  return (
    <div className={Style.App}>
      <AppHeader />
      <main className={Style.container}>
        <BurgerIngredients arr={mas}/>
        <BurgerConstructor />
      </main>
    
    </div>
  );
}

export default App;
