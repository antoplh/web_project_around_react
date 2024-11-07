import React from "react";
import logo from "../images/logo.png";

function Header() {
  return (
    <header className="header">
      <img
        id="image-logo"
        src={logo}
        className="header__logo"
        alt="logo de la pagina"
      />
      <div className="header__line"></div>
    </header>
  );
}

export default Header;
