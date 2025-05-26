import React from "react";
import Logo from "./Logo";
import HomeButton from "./HomeButton";
import "./Header.scss";
import LOGO from "../../../assets/images/logo-text.svg";

const Header = () => {
  const userId = localStorage.getItem("userId");

  return (
    <header className="header">
      <div className="header__logo">
        <Logo width="13.13vw" height="3.28vw" src={LOGO} />
      </div>
      <div className="header__right">
        <HomeButton />
        <div className="account-box">
          <span className="account-id">{userId}</span>
          <button className="logout-button">로그아웃</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
