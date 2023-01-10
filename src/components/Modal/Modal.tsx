import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Style from "../Modal/Modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useHistory, useParams } from "react-router-dom";
import {
  getUserInfo,
  IS_CLOSE,
  REMOVE_VISIBLE,
  refreshAccessToken,
} from "../../services/actions/profile";
import {
  DROP_ID_MODAL,
  getItems,
} from "../../services/actions/ingredients";
import { useTDispatch} from "../../utils/types";
const modalRoot = document.getElementById("modal-root") as HTMLElement;

interface IModalProps {
  children: any;
}

const Modal: React.FC<IModalProps> = (props) => {
  const dispatch = useTDispatch();
  const history = useHistory();
  function drop() {
    dispatch({ type: DROP_ID_MODAL });
    dispatch({ type: IS_CLOSE });
    dispatch({ type: REMOVE_VISIBLE });
  }
  useEffect(() => {
    const close = (e: any) => {
      if (e.key === "Escape") {
        drop();
        history.goBack();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  const modalClose = (evt: any) => {
    if (evt.target.id !== "buttonClose") {
      drop();
      history.goBack();
      evt.stopPropagation();
    }
  };
  return ReactDOM.createPortal(
    <>
      <ModalOverlay  />
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

export default Modal;
