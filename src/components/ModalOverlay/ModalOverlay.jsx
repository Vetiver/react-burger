import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import Style from "../ModalOverlay/ModalOverlay.module.css";
import { useHistory, useParams } from "react-router-dom";
import { getUserInfo, IS_CLOSE, REMOVE_VISIBLE, refreshAccessToken } from "../../services/actions/profile.jsx";
import { DROP_ID_MODAL, getItems } from "../../services/actions/ingredients.jsx";
import { useDispatch, useSelector } from 'react-redux';
function ModalOverlay(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const modalOverlay = (evt) => {
    if (evt.target.id == "ModalOverlay") {
    dispatch({ type: DROP_ID_MODAL })
    dispatch({ type: IS_CLOSE })
    dispatch({ type: REMOVE_VISIBLE })
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
