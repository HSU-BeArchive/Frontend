import React from "react";
import "./SignForm.scss";
import AccountInput from "../common/account/AccountInput";
import AccountButton from "../common/account/AccountButton";
import Logo from "../layout/header/Logo";
import SIGNLOGO from "../../assets/images/logo-sign.svg";

const LoginForm = () => {
  return (
    <div className="login-form">
      <Logo width="48.18vw" height="17.5vw" src={SIGNLOGO} />
      <div className="login-form__inputs">
        <AccountInput placeholder={"아이디를 입력해 주세요"} />
        <AccountInput placeholder={"비밀번호를 입력해 주세요"} />
      </div>
      {/* react-hook-form 사용 예정 */}
      <div className="login-form__error">에러 메세지 들어갈 자리</div>
      <div className="login-form__buttons">
        <AccountButton
          width="20.83vw"
          height="3.91vw"
          text="로그인"
          fSize="2.2vw"
          fWeight={600}
        />
        <AccountButton
          width="10.42vw"
          height="2.86vw"
          text="회원가입"
          fSize="1.3vw"
          fWeight={500}
        />
      </div>
    </div>
  );
};

export default LoginForm;
