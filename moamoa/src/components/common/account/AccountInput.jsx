import React from "react";
import "./Account.scss";

const AccountInput = ({ placeholder }) => {
  return (
    <input className="account-input" type="text" placeholder={placeholder} />
  );
};

export default AccountInput;
