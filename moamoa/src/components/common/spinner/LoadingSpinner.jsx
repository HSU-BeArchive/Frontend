import React from "react";
import "./LoadingSpinner.scss";
import loadingImg from "../../../assets/images/brainstorming-loading.svg";

const LoadingSpinner = ({ message }) => {
  return (
    <div className="spinner__state">
      <img src={loadingImg} alt="로딩 중" className="spinner__img" />
      <div className="spinner__overlay">
        <div className="spinner__circle" />
        <p className="spinner__text">
          {message.split("\n").map((line, i) => (
            <React.Fragment key={i}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
