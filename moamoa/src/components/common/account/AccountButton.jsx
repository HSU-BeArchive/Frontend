import React from "react";
import "./Account.scss";

const AccountButton = ({
  width,
  height,
  text,
  fSize,
  fWeight,
  disabled,
  type,
  onClick,
}) => {
  return (
    <button
      className={`login-button ${disabled ? "disabled" : "enabled"}`}
      style={{
        width: width,
        height: height,
        fontSize: fSize,
        fontWeight: fWeight,
      }}
      disabled={disabled} // 활성화 여부
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default AccountButton;
