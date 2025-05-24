import React from "react";
import { useForm } from "react-hook-form";
import { useLoginError } from "../../hooks/useLoginError";
import AccountInput from "../common/account/AccountInput";
import AccountButton from "../common/account/AccountButton";
import Logo from "../layout/header/Logo";
import SIGNLOGO from "../../assets/images/logo-sign.svg";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const { loginError, showError, clearError } = useLoginError(setError); // 에러 처리
  const loginId = watch("loginId");
  const password = watch("password");

  const onSubmit = (data) => {
    // 로그인 유효성 예시
    const isCorrect = data.loginId === "test1" && data.password === "test1111";

    if (!isCorrect) {
      showError();
      return;
    }
    clearError();

    // 백 연동 -> 메인 페이지로 이동 예정
    alert("로그인 성공");
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <Logo width="48.18vw" height="17.5vw" src={SIGNLOGO} />
      {/* 아이디, 비밀번호 입력 창 */}
      <div className="login-form__inputs">
        <AccountInput
          placeholder="아이디를 입력해 주세요"
          {...register("loginId", { required: true })}
          showError={!!errors.loginId}
          hiddenIcon
        />
        <AccountInput
          placeholder="비밀번호를 입력해 주세요"
          type="password"
          {...register("password", { required: true })}
          showError={!!errors.password}
          hiddenIcon
        />
      </div>
      {/* 에러 메세지 */}
      {
        <div className="login-form__error">
          {errors.loginId || errors.password ? loginError : "\u00A0"}
        </div>
      }

      {/* 로그인, 회원가입 버튼 */}
      <div className="login-form__buttons">
        <AccountButton
          width="20.83vw"
          height="3.91vw"
          text="로그인"
          fSize="2.2vw"
          fWeight={600}
          disabled={!loginId || !password}
          type="submit"
        />
        <AccountButton
          width="10.42vw"
          height="2.86vw"
          text="회원가입"
          fSize="1.3vw"
          fWeight={500}
        />
      </div>
    </form>
  );
};

export default LoginForm;
