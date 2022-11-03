import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  Link,
} from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import {
  getUserInfo,
  refreshAccessToken,
} from "../../services/actions/profile.jsx";
import { getItems } from "../../services/actions/ingredients.jsx";
import Modal from "../Modal/Modal.jsx";
import IngredientDetails from "../IngredientDetails/IngredientDetails.jsx";
import { useHistory } from "react-router-dom";
import FeedOrder from "../../pages/FeedOrder/FeedOrder";
import FeedDetailsHistory from "../FeedDetailsHistory/FeedDetailsHistory";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../../services/actions/wsActions";
import FeedOrdersHistory from "../../pages/FeedOredersHistory/FeedOredersHistory";

function App() {
  const location = useLocation();
  const isLogin = useSelector((state) => state.profileReducer.isLogin);
  const order = useSelector((state) => state.orderReducer.orderCard);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: WS_CONNECTION_CLOSED });
    dispatch({
      type: WS_CONNECTION_START,
      payload: {
        add: "/all",
      },
    });
    if(document.cookie != '') {
      dispatch(getUserInfo());
    }
    dispatch(getItems());
  }, []);
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
            </DndProvider>
          </main>
        </Route>
        <ProtectedRoute
          path="/login"
          anonymous={true}
          isAuth={isLogin}
          exact={true}
        >
          <main className={Style.container}>
            <Authorization />
          </main>
        </ProtectedRoute>
        <ProtectedRoute
          anonymous={true}
          isAuth={isLogin}
          path="/register"
          exact={true}
        >
          <main className={Style.container}>
            <Register />
          </main>
        </ProtectedRoute>
        <ProtectedRoute
          anonymous={true}
          isAuth={isLogin}
          path="/forgot-password"
          exact={true}
        >
          <main className={Style.container}>
            <FogotPassword />
          </main>
        </ProtectedRoute>
        <ProtectedRoute
          anonymous={true}
          isAuth={isLogin}
          path="/reset-password"
          exact={true}
        >
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
          <FeedOrder />
        </Route>
        <Route path="/feed/:id" exact={true}>
          <FeedDetailsHistory data={order} />
        </Route>
      </Switch>
      {background && (
        <Switch>
          <Route path="/ingredients/:id">
            <Modal>
              <IngredientDetails />
            </Modal>
          </Route>
          <ProtectedRoute
            isAuth={isLogin}
            exact={true}
            path="/profile/orders/:id"
          >
            <Modal>
              <FeedDetailsHistory data={order} />
            </Modal>
          </ProtectedRoute>
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
