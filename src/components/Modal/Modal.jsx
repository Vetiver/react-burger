import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import Style from "../Modal/Modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay.jsx";
import {
  CloseIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {IS_OPEN, IS_CLOSE} from "../../services/actions/profile.jsx";
import {DROP_ID_MODAL} from "../../services/actions/ingredients.jsx";
import {useDispatch, useSelector} from 'react-redux';
import { BrowserRouter as Router, Switch, Route, useLocation, useHistory } from 'react-router-dom';

const modalRoot = document.getElementById("modal-root");

function Modal(props) {
  const isOpen = useSelector(state => state.isOpen);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    const close = (e) => {
      if (e.key === 'Escape') {
        props.onClose();
        dispatch({ type: DROP_ID_MODAL})
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  const modalClose = (evt) => {
    if (evt.target.id !== "buttonClose") {
      props.onClose();
      dispatch({ type: IS_CLOSE})
      dispatch({ type: DROP_ID_MODAL})
      evt.stopPropagation();

    }
  };
  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={props.onClose} />
      <div className={`${Style.container}`}>
        <button
          id="buttonClose"
          onClick={modalClose}
          type="button"
          className={`${Style.close}`}
        >
          <CloseIcon type="primary" />
        </button>
        {props.children}
      </div>
    </>,
    modalRoot
  );
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default Modal;
