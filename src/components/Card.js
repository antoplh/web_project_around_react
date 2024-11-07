import React from "react";

function Card({ card, onCardClick }) {
  console.log(card);
  return (
    <div class="card">
      <button class="card__delete"></button>
      <img
        class="card__image"
        src={card.link}
        alt={card.name}
        onClick={() => onCardClick(card)}
      />
      <div class="card__description">
        <h3 class="card__title">{card.name}</h3>
        <button class="card__heart" data-likes={card.likes.length}></button>
      </div>
    </div>
  );
}

export default Card;
