// components/ImagePopup.jsx
import React from "react";
import closeButton from "../../../../../images/Close_Icon.png"; // Importar closeButton
import Popup from "../Popup";

function ImagePopup({ card, onClose }) {
  return (
    <Popup isOpen={card} onClose={onClose}>
      {card && (
        <>
          <img src={card.link} alt={card.name} className="popup__image" />
          <p className="popup__caption">{card.name}</p>
        </>
      )}
    </Popup>
  );
}

export default ImagePopup;
