import React from 'react';
import ReactDOM from 'react-dom';
import Style from "../ModalOverlay/ModalOverlay.module.css";
import Modal from '../Modal/Modal.jsx';
const modalRoot = document.getElementById("modal-root");

function ModalOverlay(props) {
  return ReactDOM.createPortal ((
    <>
  	<div className={`${Style.container}`}>
      {props.children}
    </div>
    </>
  ), modalRoot);
}

export default ModalOverlay;