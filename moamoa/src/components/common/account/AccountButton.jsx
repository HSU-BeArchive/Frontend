import React from "react";
import "./Account.scss";

const AccountButton = ({ width, height, text, fSize, fWeight }) => {
  return (
    <button
      className="login-button"
      style={{
        width: width,
        height: height,
        fontSize: fSize,
        fontWeight: fWeight,
      }}
    >
      {text}
    </button>
  );
};

export default AccountButton;
