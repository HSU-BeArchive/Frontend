import { useState } from "react";
import { validatePassword } from "../utils/validation";

// 비밀번호 유효성 검사
export const usePwValidation = () => {
  const [pwValid, setPwValid] = useState(false);

  const checkPassword = (pw) => {
    const isValid = validatePassword(pw);
    setPwValid(isValid);
    return (
      isValid || "영문과 숫자를 조합하여 8자리 이상 비밀번호를 입력해 주세요"
    );
  };

  return { pwValid, checkPassword };
};
