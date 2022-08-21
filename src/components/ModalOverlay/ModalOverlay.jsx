import React, { Component, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Style from "../ModalOverlay/ModalOverlay.module.css";
import Modal from '../Modal/Modal.jsx';
const modalRoot = document.getElementById("modal-root");

function ModalOverlay(props) {
  const modalOverlay = (evt) => {
    if (evt.target.id === "ModalOverlay") {
      props.onClose();
    }
  }

  return ReactDOM.createPortal ((
    <>
  	<div onClick={modalOverlay} className={`${Style.container}`}
    id = "ModalOverlay">
      <Modal onClose={props.onClose}>
        {props.children}
      </Modal>
    </div>
    </>
  ), modalRoot);
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func
}

export default ModalOverlay;