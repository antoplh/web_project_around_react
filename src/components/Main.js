import React from "react";
import edit_avatar from "../images/edit_avatar.svg";
import edit_button from "../images/Edit_Button.png";
import add_button from "../images/Add_Button.png";
import api from "../utils/api";
import Card from "./Card";

function Main({
  onEditAvatarClick,
  onEditProfileClick,
  onAddPlaceClick,
  onCardClick,
}) {
  const [userName, setUserName] = React.useState("test");
  const [userDescription, setUserDescription] = React.useState("test");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .get(`users/me`)
      .then((data) => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
      })
      .catch((err) => console.log(err));

    api
      .get(`cards`)
      .then((data) => {
        setCards(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-section">
          <img
            id="image-avatar"
            style={{
              backgroundImage: `url(${userAvatar})`,
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
            <h2 className="profile__name">{userName}</h2>
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

          <p className="profile__description">{userDescription}</p>
        </div>
        <button className="profile__add-button" onClick={onAddPlaceClick}>
          <img
            id="image-add"
            src={add_button}
            alt="boton de añadir en perfil"
          />
        </button>
      </section>
      <section className="cards">
        {cards.map((card) => (
          <Card key={card._id} card={card} onCardClick={onCardClick} />
        ))}
      </section>
    </main>
  );
}

export default Main;
