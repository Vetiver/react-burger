import React, { useEffect} from "react";
import IngredientDetailsModal from '../IngredientDetailsModal/IngredientDetailsModal.jsx';
import { BrowserRouter as Router, Switch, Route, useLocation} from 'react-router-dom';
import AppHeader from "../App-header/App-header";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Authorization from "../../pages/Authorization/Authorization.jsx";
import Register from "../../pages/Register/Register";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import Style from "../App/App.module.css";
import FogotPassword from "../../pages/ForgotPassword/FogotPassword";
import Profile from "../../pages/Profile/Profile.jsx";
import {ProtectedRoute} from "../ProtectedRoute/ProtectedRoute.jsx";
import {useDispatch, useSelector} from 'react-redux';
import {IS_CLOSE} from "../../services/actions/profile.jsx";
import {DROP_ID_MODAL, getItems} from "../../services/actions/ingredients.jsx";
import Modal from "../Modal/Modal.jsx";
import IngredientDetails from "../IngredientDetails/IngredientDetails.jsx";
import OrderDetails from "../OrderDetails/OrderDetails.jsx";
import { useHistory, useParams} from "react-router";


function App() {
  const isOpen = useSelector(state => state.isOpen);
  const id = useSelector(state => state.modalInfo);
  const dispatch = useDispatch();
    useEffect(() => {
    dispatch(getItems())
  },[])
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


      <div className={Style.App}>
        <AppHeader />
        <Switch location={background || location}>
          <Route path="/" isAuth={isLogin} exact={true}>
            <main className={Style.container}>
            <DndProvider backend = {HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
            </ DndProvider>
            </main>
          </Route>
          <ProtectedRoute path="/login" anonymous={true} isAuth={isLogin} exact={true}>
          <main className={Style.container}>
            <Authorization />
          </main>
          </ProtectedRoute>
          <ProtectedRoute anonymous={true} path="/register" exact={true}>
          <main className={Style.container}>
            <Register/>
          </ main>
          </ProtectedRoute>
          <ProtectedRoute anonymous={true} path="/forgot-password" exact={true}>
          <main className={Style.container}>
            <FogotPassword />
          </main>
          </ProtectedRoute>
          <ProtectedRoute anonymous={true} path="/reset-password" exact={true}>
          <main className={Style.container}>
            <ResetPassword />
          </main>
          </ProtectedRoute>
          <ProtectedRoute path="/profile" isAuth={isLogin} exact={true}>
            <Profile />
          </ProtectedRoute>
          <Route path="/ingredients/:id">
          <main className={Style.modalContainer}>
            <IngredientDetailsModal />
          </main>  
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







  );
}


export default App;
