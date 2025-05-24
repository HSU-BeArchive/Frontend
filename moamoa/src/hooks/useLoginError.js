// 로그인 에러 처리
import { useState } from "react";

export const useLoginError = (setError) => {
  const [loginError, setLoginError] = useState("");

  const showError = () => {
    setLoginError("아이디 또는 비밀번호가 틀렸습니다");
    setError("loginId", { type: "manual" });
    setError("password", { type: "manual" });
  };

  const clearError = () => {
    setLoginError("");
  };

  return { loginError, showError, clearError };
};
