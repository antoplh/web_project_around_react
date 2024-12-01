// components/Popup.jsx
import React from "react";
import closeButton from "../../../../images/Close_Icon.png";

function Popup({ isOpen, onClose, title, children }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button className="form__button-close" onClick={onClose}>
          <img
            src={closeButton}
            className="form__button-close-img"
            alt="cerrar"
          />
        </button>
        {title && <h3 className="form__title">{title}</h3>}
        <div className="form__content">{children}</div>
      </div>
    </div>
  );
}

export default Popup;
