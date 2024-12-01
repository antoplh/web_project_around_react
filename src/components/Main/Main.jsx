import React, { useState } from "react";
import edit_avatar from "../../images/edit_avatar.svg";
import edit_button from "../../images/Edit_Button.png";
import add_button from "../../images/Add_Button.png";
import CurrentUserContext from "../../context/CurrentUserContext";
import Card from "./components/Card/Card";
import NewCard from "./components/Popup/NewCard/NewCard";
import RemoveCard from "./components/Popup/RemoveCard/RemoveCard";

function Main({
  onEditAvatarClick,
  onEditProfileClick,
  onAddPlaceClick,
  onCardClick,
  cards,
  onCardLike,
  onAddCard,
  onCardDelete,
}) {
  const { currentUser } = React.useContext(CurrentUserContext);
  const [isNewCardOpen, setIsNewCardOpen] = useState(false);
  const [isRemoveCardOpen, setIsRemoveCardOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleRemoveCard = (card) => {
    setSelectedCard(card);
    setIsRemoveCardOpen(true);
  };

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-section">
          <img
            id="image-avatar"
            style={{
              backgroundImage: `url(${currentUser.avatar})`,
              backgroundSize: "cover",
            }}
            className="profile__avatar"
          />
          <button
            className="profile__edit-avatar-button"
            onClick={onEditAvatarClick}
          >
            <img
              id="avatar-edit"
              src={edit_avatar}
              alt="boton de editar avatar"
            />
          </button>
        </div>

        <div className="profile__info">
          <div className="profile__name-container">
            <h2 className="profile__name">{currentUser.name}</h2>
            <button
              className="profile__edit-button"
              onClick={onEditProfileClick}
            >
              <img
                id="image-edit"
                src={edit_button}
                alt="boton de editar perfil"
              />
            </button>
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          onClick={() => setIsNewCardOpen(true)}
        >
          <img
            id="image-add"
            src={add_button}
            alt="boton de añadir en perfil"
          />
        </button>
      </section>

      {/* Popup para agregar nueva tarjeta */}
      <NewCard
        isOpen={isNewCardOpen}
        onClose={() => setIsNewCardOpen(false)}
        onAddCard={onAddCard}
      />

      {/* Popup para confirmar eliminación de tarjeta */}
      <RemoveCard
        isOpen={isRemoveCardOpen}
        onClose={() => setIsRemoveCardOpen(false)}
        onConfirmDelete={onCardDelete}
        card={selectedCard}
      />

      <section className="cards">
        {cards?.map((card) => (
          <div key={card._id} className="card">
            <Card
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={handleRemoveCard}
            />
            <button
              onClick={() => handleRemoveCard(card)}
              className="card__delete-button"
            >
              Eliminar
            </button>
          </div>
        ))}
      </section>
    </main>
  );
}

export default Main;
