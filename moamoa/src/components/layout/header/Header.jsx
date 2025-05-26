import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import HomeButton from "./HomeButton";
import "./Header.scss";
import LOGO from "../../../assets/images/logo-text.svg";

const Header = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("loginId");

    navigate("/");
  };

  return (
    <header className="header">
      <div className="header__logo">
        <Logo width="13.13vw" height="3.28vw" src={LOGO} />
      </div>
      <div className="header__right">
        <HomeButton />
        <div className="account-box">
          <span className="account-id">{userId}</span>
          <button className="logout-button" onClick={handleLogout}>로그아웃</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
