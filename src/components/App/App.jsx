import React, { useEffect, useState } from 'react';
import AppHeader from '../App-header/App-header';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Style from "../App/App.module.css";




function App() {
  const [api, apiState] = React.useState({
    isLoading: false,
    hasError: false,
    data: [],
  })
  useEffect(() => {
    const getData = async () => {
      apiState({...api, isLoading: true});
      try {
        const res = await fetch('https://norma.nomoreparties.space/api/ingredients');
        if (!res.ok) {
          throw new Error('Ответ сети был не ok :)');
        }
        const data = await res.json();
        apiState({...api, data: data.data, isLoading: false });
      } catch (error) {
        console.error(error)
      } 
    }
    getData();
  }, [])

  

  const {data} = api;

  return (
    <div className={Style.App}>
      <AppHeader />
      <main className={Style.container}>
        <BurgerIngredients arr={data}/>
        <BurgerConstructor arr={data}/>
      </main>
    </div>
  );
}

export default App;
