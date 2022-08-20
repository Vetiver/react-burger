import React, { useEffect, useState } from 'react';
import AppHeader from '../App-header/App-header';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Style from "../App/App.module.css";
import ModalOverlay from '../ModalOverlay/ModalOverlay.jsx';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails.jsx';



function App() {
  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    data: [],
  })
  React.useEffect(() => {
    const getData = async () => {
      setState({...state, isLoading: true});
      const res = await fetch('https://norma.nomoreparties.space/api/ingredients');
      const data = await res.json();
      setState({...state, data: data.data, isLoading: false });
    }
    getData();
  }, [])

  

  const {data} = state;

  return (
    <div className={Style.App}>
      <AppHeader />
      <main className={Style.container}>
        <BurgerIngredients arr={data}/>
        <BurgerConstructor />
      </main>
    </div>
  );
}

export default App;
