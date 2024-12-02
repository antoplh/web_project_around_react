import React, { useState, useEffect } from "react";
import "../index.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import EditAvatar from "./Main/components/Popup/EditAvatar/EditAvatar";
import EditProfile from "./Main/components/Popup/EditProfile/EditProfile";
import ImagePopup from "./Main/components/Popup/ImagePopup/ImagePopup";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

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

  // Actualizar avatar
  const handleUpdateAvatar = async (data) => {
    try {
      const updatedUser = await api.setUserAvatar(data);
      setCurrentUser(updatedUser);
    } catch (error) {
      console.error("Error al actualizar el avatar:", error);
    }
  };

  // Actualizar perfil del usuario
  const handleUpdateUser = async (data) => {
    try {
      const updatedUser = await api.setUserInfo(data);
      setCurrentUser(updatedUser);
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };

  // Cargar datos de usuario y tarjetas desde la API
  useEffect(() => {
    (async () => {
      try {
        const [userInfo, cardList] = await Promise.all([
          api.getUserInfo(),
          api.getCards(),
        ]);
        setCurrentUser(userInfo);
        setCards(cardList);
      } catch (error) {
        console.error("Error al cargar datos iniciales:", error);
      }
    })();
  }, []);

  // Manejar "like" de tarjetas
  const handleCardLike = async (card) => {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    try {
      const response = await api.changeLikeCardStatus(card._id, !isLiked);
      const newCard = await response.json();
      setCards((state) =>
        state.map((currentCard) =>
          currentCard._id === card._id ? newCard : currentCard
        )
      );
    } catch (error) {
      console.error("Error al actualizar el like:", error);
    }
  };

  // Agregar nueva tarjeta
  const handleAddCard = async (cardData) => {
    try {
      const newCard = await api.post("cards", {
        name: cardData.title,
        link: cardData.imageUrl,
      });
      setCards((prevCards) => [newCard, ...prevCards]);
    } catch (error) {
      console.error("Error al agregar la tarjeta:", error);
    }
  };

  // Eliminar tarjeta
  const handleCardDelete = async (card) => {
    try {
      await api.deleteCard(card._id);
      setCards((prevCards) => prevCards.filter((c) => c._id !== card._id));
    } catch (error) {
      console.error("Error al eliminar la tarjeta:", error);
    }
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, handleUpdateUser }}>
      <div className="page__content">
        <Header />
        <Main
          cards={cards}
          onEditAvatarClick={handleEditAvatarClick}
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onAddCard={handleAddCard}
          onCardDelete={handleCardDelete}
        />
        <Footer />

        {/* Edit Avatar Popup */}
        <EditAvatar
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        {/* Edit Profile Popup */}
        <EditProfile
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        {/* Image Popup */}
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
