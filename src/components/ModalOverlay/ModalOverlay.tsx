import React from "react";
import PropTypes from "prop-types";
import Style from "../ModalOverlay/ModalOverlay.module.css";
import { useHistory, useParams } from "react-router-dom";




const ModalOverlay: React.FC = () => {
  const history = useHistory();
  const modalOverlay = (evt:React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.id == "ModalOverlay") {
      history.goBack();
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
