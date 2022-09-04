import React, { useEffect, useState } from "react";
import AppHeader from "../App-header/App-header";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Style from "../App/App.module.css";
import { BurgerContext } from "../../contexts/BurgerContext.jsx";
import checkResponse from "../../utils/checkResponse.jsx";
import Modal from "../Modal/Modal";

function App() {
  const baseUrl = "https://norma.nomoreparties.space";
  const [api, apiState] = React.useState({
    isLoading: false,
    hasError: false,
    data: [],
  });
  useEffect(() => {
    const getData = async () => {
      apiState({ ...api, isLoading: true });
      try {
        const res = await fetch(`${baseUrl}/api/ingredients`);
        const data = await checkResponse(res);
        apiState({ ...api, data: data.data, isLoading: false });
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  const { data } = api;
  return (
    <div className={Style.App}>
      <AppHeader />
      <main className={Style.container}>
        <BurgerContext.Provider value={data}>
          <BurgerIngredients />
          <BurgerConstructor />
        </BurgerContext.Provider>
      </main>
    </div>
  );
}

export default App;
