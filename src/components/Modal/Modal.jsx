import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import Style from "../Modal/Modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay.jsx";
import {
  CloseIcon,
  CheckMarkIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("modal-root");

function Modal(props) {
  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        props.onClose();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  const modalClose = (evt) => {
    if (evt.target.id !== "buttonClose") {
      props.onClose();
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
  onClose: PropTypes.func,
};

export default Modal;
