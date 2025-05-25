// 유효성 검사 로직

// ----- 폴더명 중복 체크 -----
export const isDuplicateFolderName = (current, original, folderNames) => {
  const name = current.trim();
  if (name === "" || name === original) return false;

  return folderNames.includes(name);
};

// ----- 아이디 유효성검사: 영문자+숫자, 4자 이상 -----
export const validateUserId = (id) =>
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/.test(id);

// ----- 비밀번호 유효성검사: 영문자+숫자, 8자 이상 -----
export const validatePassword = (pw) =>
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pw);
