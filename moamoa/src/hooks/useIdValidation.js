import { useEffect, useState } from "react";
import { validateUserId } from "../utils/validation";
import signupUserApi from "../api/user/signupUserApi";

// 아이디 유효성 검사
export const useIdValidation = (watch, setError, clearErrors) => {
  const [idValid, setIdValid] = useState(false);
  const loginId = watch("loginId");

  // 아이디 바뀔 때마다 유효 상태 초기화
  useEffect(() => {
    setIdValid(false);
    clearErrors("loginId");
  }, [loginId, clearErrors]);

  // 에러 확인 핸들러
  const handleIdCheck = async () => {
    const isFormatValid = validateUserId(loginId);

    if (!isFormatValid) {
      setError("loginId", {
        type: "manual",
        message: "영문과 숫자를 조합하여 4자리 이상 아이디를 입력해 주세요",
      });
      setIdValid(false);
      return;
    }

    const result = await signupUserApi(loginId, "0000");

    if (result === null) {
      setError("loginId", {
        type: "manual",
        message: "이미 사용하고 있는 아이디입니다",
      });
      setIdValid(false);
    } else {
      clearErrors("loginId");
      setIdValid(true);
    }
  };

  return { idValid, handleIdCheck };
};
