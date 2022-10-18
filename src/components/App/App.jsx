import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, useLocation} from 'react-router-dom';
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
import {IS_OPEN, IS_CLOSE} from "../../services/actions/profile.jsx";
import {DROP_ID_MODAL} from "../../services/actions/ingredients.jsx";
import Modal from "../Modal/Modal.jsx";
import IngredientDetails from "../IngredientDetails/IngredientDetails.jsx";
import OrderDetails from "../OrderDetails/OrderDetails.jsx";
import { useHistory, useParams } from "react-router";

function App() {
  const ingredients = useSelector(state => state.allIngredients);
  const isOpen = useSelector(state => state.isOpen);
  const id = useSelector(state => state.modalInfo);
  const dispatch = useDispatch();
  const location = useLocation();
  const isLogin = useSelector(state => state.isLogin);
  const history = useHistory();
  const background = location.state && location.state.background;
  function handleCloseModal(e) {
    dispatch({ type: DROP_ID_MODAL })
    dispatch({ type: IS_CLOSE })
    history.goBack();
  }

  return (
    <ProvideAuth>

      <div className={Style.App}>
        <AppHeader />
        <Switch location={background || location}>
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
          <Route path="/ingredients/:id">
            <IngredientDetails ingredient={id} />
          </Route>
        </Switch>
        {isOpen && (
        <Modal onClose={handleCloseModal}><IngredientDetails ingredient={id} /></Modal>
      )}
      {background && (
        <Route path="/feed/:id">
          <Modal>
            <OrderDetails />
          </Modal>
        </Route>
      )}
      </div>

    </ProvideAuth>
  );
}

export default App;
