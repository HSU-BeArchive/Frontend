import React from "react";
import Logo from "./Logo";
import HomeButton from "./HomeButton";
import "./Header.scss";
import LOGO from "../../../assets/images/logo-text.svg";

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <Logo width="10.41vw" height="2.6vw" src={LOGO} />
      </div>
      <div className="header__right">
        <HomeButton />
        <div className="account-box">
          <span className="account-id">아이디</span>
          <button className="logout-button">로그아웃</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
