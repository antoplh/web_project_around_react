import React from "react";
import closeButton from "../images/Close_Icon.png";

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup ${card ? "popup_opened" : ""}`} id="image-popup">
      <div className="popup__container popup-image__container">
        <button className="form__button-close" onClick={onClose}>
          <img
            className="form__button-close-img"
            alt="close button"
            src={closeButton}
          />
        </button>
        {card && (
          <>
            <img src={card.link} alt={card.name} className="popup__image" />
            <p className="popup__caption">{card.name}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default ImagePopup;
