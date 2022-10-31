import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, useLocation, Link } from 'react-router-dom';
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
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, refreshAccessToken} from "../../services/actions/profile.jsx";
import {getItems } from "../../services/actions/ingredients.jsx";
import Modal from "../Modal/Modal.jsx";
import IngredientDetails from "../IngredientDetails/IngredientDetails.jsx";
import { useHistory} from "react-router-dom";
import FeedOrder from "../../pages/FeedOrder/FeedOrder";
import FeedDetailsHistory from "../FeedDetailsHistory/FeedDetailsHistory";
import {WS_CONNECTION_START} from '../../services/actions/wsActions';
import FeedOrdersHistory from "../../pages/FeedOredersHistory/FeedOredersHistory";

function App() {
  const order = useSelector(state => state.orderCard);
  const allOrders = useSelector(state => state.allOrders);
  const isOpen = useSelector(state => state.isOpen);
  const visible = useSelector(state => state.visibleStatus);
  const id = useSelector(state => state.modalInfo);
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(getItems())
      dispatch(refreshAccessToken())
      dispatch(getUserInfo())
  }, [])
  const location = useLocation();
  const isLogin = useSelector(state => state.isLogin);
  const history = useHistory();
  const background = location.state?.background;
  
  

  return (


    <div className={Style.App}>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" isAuth={isLogin} exact={true}>
          <main className={Style.container}>
            <DndProvider backend={HTML5Backend}>
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
            <Register />
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
        <ProtectedRoute isAuth={isLogin} path="/ingredients/:id">
          <main className={Style.modalContainer}>
            <IngredientDetails />
          </main>
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders" isAuth={isLogin} exact={true}>
          <div className={Style.mainContainer}>
            <FeedOrdersHistory />
          </div>
        </ProtectedRoute>
        <Route path="/feed" exact={true}>
        <div className={Style.feedContainer}>
            <FeedOrder/>
          </div>
        </Route>
        <Route path="/feed/:id" exact={true}>
        <FeedDetailsHistory data={order} />
        </Route>
      </Switch>
      {background && (
        <Switch>
        <Route path="/ingredients/:id">
          <Modal>
            <IngredientDetails ingredient={id} />
          </Modal>
        </Route>
        <Route path="/profile/orders/:id">
          <Modal>
          <FeedDetailsHistory data={order} />
          </Modal>
        </Route>
        <Route path="/feed/:id">
          <Modal>
          <FeedDetailsHistory data={order} />
          </Modal>
        </Route>
        </Switch>
      )}
    </div>







  );
}


export default App;
