import defaultInstance from "../utils/instance";

const updateFolderNameApi = async (folderId, folderName) => {
  const userId = localStorage.getItem("userId");
  try {
    const response = await defaultInstance.patch(
      `/user/${userId}/folder/${folderId}`,
      { folderName }
    );

    const { httpStatus, isSuccess, data, message, code } = response.data;

    if (httpStatus === 200 && isSuccess) {
      console.log("폴더 이름 수정 성공:", data);
      return { success: true, data };
    } else {
      console.warn(`폴더 이름 수정 실패 [${code}]:`, message);
      return { success: false, message };
    }
  } catch (error) {
    console.error("폴더 이름 수정 중 에러:", error);
    return { success: false, message: "서버 통신 에러" };
  }
};

export default updateFolderNameApi;
