import React from "react";
import "./Header.scss";
import { HiHome } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const HomeButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/main");
  };

  return (
    <div className="home-button" onClick={handleClick}>
      <HiHome size="3.13vw" />
    </div>
  );
};

export default HomeButton;
