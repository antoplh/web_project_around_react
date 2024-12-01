// components/EditAvatar.jsx
import React, { useRef, useContext } from "react";
import closeButton from "../../../../../images/Close_Icon.png"; // Importar closeButton
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";
import Popup from "../Popup";

function EditAvatar({ isOpen, onClose, onUpdateAvatar }) {
  const userContext = useContext(CurrentUserContext);
  const { currentUser } = userContext;

  const avatarInputRef = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarInputRef.current.value,
    });
    avatarInputRef.current.value = "";
    onClose();
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose} title="Actualizar avatar">
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
    </Popup>
  );
}

export default EditAvatar;
