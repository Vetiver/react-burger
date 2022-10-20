import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import Style from "../ModalOverlay/ModalOverlay.module.css";



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
