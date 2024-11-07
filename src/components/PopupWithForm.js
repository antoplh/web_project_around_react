import React from "react";
import closeButton from "../images/Close_Icon.png";

function PopupWithForm(props) {
  return (
    <div
      className={`popup ${props.isOpen ? "popup_opened" : ""}`}
      id={`${props.name}-popup`}
    >
      <div className="popup__container">
        <form
          className="form"
          id={`${props.name}-form`}
          noValidate
          onSubmit={props.onSubmit}
        >
          <fieldset className="form__set">
            <button
              className="form__button-close"
              type="button"
              onClick={props.onClose}
            >
              <img
                src={closeButton}
                id="image-close"
                className="form__button-close-img"
                alt="close button"
              />
            </button>
            <h3 className="form__title">{props.title}</h3>
            {props.children}
            <button
              className="form__button-save form__button-save_active"
              type="submit"
            >
              {props.submit_button_text}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
