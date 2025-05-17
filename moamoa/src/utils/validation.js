// 유효성 검사 로직

// ----- 폴더명 중복 체크 -----
export const isDuplicateFolderName = (current, original, folderNames) => {
  const name = current.trim();
  if (name === "" || name === original) return false;

  return folderNames.includes(name);
};
