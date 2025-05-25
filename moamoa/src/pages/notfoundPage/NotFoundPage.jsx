import React from "react";
import "./NotFoundPage.scss";
import notfoundImage from "../../assets/images/notfound-img.svg";
import LOGO from "../../assets/images/logo-text.svg";
import HomeButton from "../../components/layout/header/HomeButton";

const NotFoundPage = () => {
  return (
    <div className="notfound-container">
      <header className="notfound-header">
        <img src={LOGO} alt="로고" className="notfound-logo" />
        <HomeButton />
      </header>

      <div className="notfound-wrapper">
        <div className="notfound-content">
          <img src={notfoundImage} alt="404 에러" className="notfound-image" />
          <p className="notfound-title">404 Not Found</p>
          <p className="notfound-message">
            죄송합니다. 현재 찾을 수 없는 페이지를 요청하셨습니다.
            <br />
            존재하지 않는 주소를 입력하셨거나,
            <br />
            요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
