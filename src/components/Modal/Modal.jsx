import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Style from "../Modal/Modal.module.css"; 
import {CloseIcon, CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components"

function Modal(props) {
  return (
    <div className={`${Style.container}`}>
			<button onClick={props.onClose} type="button" className={`${Style.close}`}><CloseIcon type="primary" /></button>
      {props.children}
    </div>
  );
}
Modal.propTypes = {
  onClose: PropTypes.func
}

export default Modal;