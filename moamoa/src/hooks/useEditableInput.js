import { useState } from "react";

// 입력값의 수정 상태 관리, 변경 여부 판단
const useEditableInput = (initValue = "") => {
  const [inputValue, setInputValue] = useState(initValue); // 입력 값
  const [originalValue, setOriginalValue] = useState(initValue); // 원래 값

  const isModified = inputValue !== originalValue; // 수정 여부

  // 입력 값 저장
  const commitValue = () => {
    setOriginalValue(inputValue);
  };

  return {
    inputValue,
    setInputValue,
    originalValue,
    isModified,
    commitValue,
  };
};

export default useEditableInput;
