import React, { useState } from "react";
import closeButton from "../../../../../images/Close_Icon.png";

function NewCard({ isOpen, onClose, onAddCard }) {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCard({ title, imageUrl });
    setTitle("");
    setImageUrl("");
    onClose();
  };

  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <form
          className="form"
          id="place-form"
          onSubmit={handleSubmit}
          novalidate
        >
          <fieldset className="form__set">
            <button
              className="form__button-close"
              type="button"
              onClick={onClose}
            >
              <img
                className="form__button-close-img"
                alt="close button"
                src={closeButton}
              />
            </button>
            <h3 className="form__title">Nuevo Lugar</h3>
            <input
              id="title-input"
              className="form__input"
              type="text"
              name="title"
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              minlength="2"
              maxlength="30"
              required
            />
            <span className="form__input-error title-input-error"></span>
            <input
              id="url-input"
              className="form__input"
              type="url"
              name="url"
              placeholder="URL de la imagen"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
            <span className="form__input-error url-input-error"></span>
            <button
              className="form__button-save form__button-save_active"
              type="submit"
            >
              Guardar
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default NewCard;
