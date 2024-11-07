import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import React from "react";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleConfirmPopup = () => setIsConfirmPopupOpen(true);
  const handleCardClick = (card) => setSelectedCard(card);

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard(null);
  };

  return (
    <div className="page__content">
      <Header />
      <Main
        onEditAvatarClick={handleEditAvatarClick}
        onEditProfileClick={handleEditProfileClick}
        onAddPlaceClick={handleAddPlaceClick}
        onConfirmClick={handleConfirmPopup}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        name="profilepic"
        title="Cambiar foto de perfil"
        submit_button_text="Guardar"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input
          id="profilepic-input"
          className="form__input"
          type="url"
          name="profilepic"
          placeholder="URL"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="form__input-error profilepic-input-error"></span>
      </PopupWithForm>
      <PopupWithForm
        name="profile"
        title="Editar perfil"
        submit_button_text="Guardar"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          id="name-input"
          className="form__input"
          type="text"
          name="name"
          placeholder="Nombre"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="form__input-error name-input-error"></span>
        <input
          id="aboutme-input"
          className="form__input"
          type="text"
          name="aboutme"
          placeholder="Acerca de mí"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="form__input-error aboutme-input-error"></span>
      </PopupWithForm>
      <PopupWithForm
        name="place"
        title="Nuevo Lugar"
        submit_button_text="Guardar"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          id="title-input"
          className="form__input"
          type="text"
          name="title"
          placeholder="Título"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="form__input-error title-input-error"></span>
        <input
          id="url-input"
          className="form__input"
          type="url"
          name="url"
          placeholder="URL de la imagen"
          required
        />
        <span className="form__input-error url-input-error"></span>
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <PopupWithForm
        name="confirm"
        title="¿Estás seguro?"
        submit_button_text="Sí"
        isOpen={isConfirmPopupOpen}
        onClose={closeAllPopups}
      />
    </div>
  );
}

export default App;
