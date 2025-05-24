import { useEffect, useState } from "react";
import { validateUserId } from "../utils/validation";

// 아이디 유효성 검사
export const useIdValidation = (watch, setError, clearErrors) => {
  const [idValid, setIdValid] = useState(false);
  const loginId = watch("loginId");

  // 아이디 바뀔 때마다 유효 상태 초기화
  useEffect(() => {
    setIdValid(false);
    clearErrors("loginId");
  }, [loginId, clearErrors]);

  // 중복 확인 핸들러
  const handleIdCheck = () => {
    const isDuplicate = loginId === "testuser"; // 중복 예시 데이터
    const isFormatValid = validateUserId(loginId);

    if (!isFormatValid) {
      setError("loginId", {
        type: "manual",
        message: "영문과 숫자를 조합하여 4자리 이상 아이디를 입력해 주세요",
      });
      setIdValid(false);
    } else if (isDuplicate) {
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
