// components/EditProfile.jsx
import React, { useState, useContext, useEffect } from "react";
import closeButton from "../../../../../images/Close_Icon.png"; // Importar closeButton
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";
import Popup from "../Popup";

function EditProfile({ isOpen, onClose, onUpdateUser }) {
  const userContext = useContext(CurrentUserContext);
  const { currentUser } = userContext;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentUser.name && currentUser.about) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser]);

  const handleNameChange = (e) => {
    setName(e.target.value);
    validateForm(e.target.value, description);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    validateForm(name, e.target.value);
  };

  const validateForm = (nameValue, descriptionValue) => {
    const isNameValid =
      nameValue.trim().length >= 2 && nameValue.trim().length <= 40;
    const isDescriptionValid =
      descriptionValue.trim().length >= 2 &&
      descriptionValue.trim().length <= 200;

    setIsButtonActive(isNameValid && isDescriptionValid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await onUpdateUser({ name, about: description });
      onClose();
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose} title="Editar perfil">
      <form className="form" onSubmit={handleSubmit} noValidate>
        <fieldset className="form__set">
          <input
            className="form__input"
            type="text"
            name="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Nombre"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="form__input-error name-input-error"></span>
          <input
            className="form__input"
            type="text"
            name="about"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Acerca de mí"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="form__input-error about-input-error"></span>
          <button
            className={`form__button-save ${
              isButtonActive ? "form__button-save_active" : ""
            } ${isLoading ? "form__button-save_disabled" : ""}`}
            type="submit"
            disabled={!isButtonActive || isLoading}
          >
            {isLoading ? "Guardando..." : "Guardar"}
          </button>
        </fieldset>
      </form>
    </Popup>
  );
}

export default EditProfile;
