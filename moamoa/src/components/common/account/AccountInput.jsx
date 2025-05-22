import React, { forwardRef } from "react";
import "./Account.scss";
import { HiMiniCheckCircle } from "react-icons/hi2";
import { HiExclamationCircle } from "react-icons/hi";

const AccountInput = forwardRef(
  (
    {
      placeholder,
      type = "text",
      showError,
      showCheck,
      checkButton,
      onCheckClick,
      ...props
    },
    ref
  ) => {
    return (
      <div className="account-input__wrapper">
        {/* 입력창 */}
        <input
          {...props}
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={`account-input 
            ${showCheck ? "input-success" : ""} 
            ${showError ? "input-error" : ""}`}
        />
        {checkButton && (
          <button type="button" className="check-button" onClick={onCheckClick}>
            중복확인
          </button>
        )}

        {/* 중복, 유효성 검사 결과 아이콘 */}
        {showCheck && (
          <HiMiniCheckCircle className="check-icon" size="1.56vw" />
        )}
        {showError && (
          <HiExclamationCircle className="error-icon" size="1.56vw" />
        )}
      </div>
    );
  }
);

export default AccountInput;
