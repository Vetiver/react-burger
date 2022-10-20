import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import Style from "../ModalOverlay/ModalOverlay.module.css";
import Modal from "../Modal/Modal.jsx";
import {IS_OPEN, IS_CLOSE} from "../../services/actions/profile.jsx";
import {useDispatch, useSelector} from 'react-redux';
import { BrowserRouter as Router, Switch, Route, useLocation, useHistory } from 'react-router-dom';


function ModalOverlay(props) {
  const modalOverlay = (evt) => {
    if (evt.target.id == "ModalOverlay") {
      props.onClose();
    }
    evt.stopPropagation();
  };

  return (
    <div
      onClick={modalOverlay}
      className={`${Style.container}`}
      id="ModalOverlay"
    ></div>
  );
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func,
};

export default ModalOverlay;
