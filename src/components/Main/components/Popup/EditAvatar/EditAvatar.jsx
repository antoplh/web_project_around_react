import React, { useRef, useContext } from "react";
import closeButton from "../../../../../images/Close_Icon.png";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

function EditAvatar({ isOpen, onClose, onUpdateAvatar }) {
  const userContext = useContext(CurrentUserContext);
  const { currentUser } = userContext;

  // Crear un ref para acceder al valor del input
  const avatarInputRef = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Usar el valor del ref para actualizar el avatar
    onUpdateAvatar({
      avatar: avatarInputRef.current.value,
    });

    // Reiniciar el valor del campo después de enviar
    avatarInputRef.current.value = "";
    onClose();
  };

  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""}`}
      id="edit-avatar-popup"
    >
      <div className="popup__container">
        <button className="form__button-close" onClick={onClose}>
          <img
            src={closeButton}
            className="form__button-close-img"
            alt="cerrar"
          />
        </button>
        <h3 className="form__title">Actualizar avatar</h3>
        <form className="form" onSubmit={handleSubmit} noValidate>
          <fieldset className="form__set">
            <input
              ref={avatarInputRef}
              className="form__input"
              type="url"
              name="avatar"
              placeholder="URL del avatar"
              required
            />
            <span className="form__input-error avatar-input-error"></span>
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

export default EditAvatar;
