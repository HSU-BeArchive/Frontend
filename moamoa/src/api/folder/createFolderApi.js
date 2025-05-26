// 폴더 생성 API(POST)
import defaultInstance from "../utils/instance";

const createFolderApi = async (folderName) => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await defaultInstance.post(`/folder/${userId}`, {
      folderName,
    });

    const { httpStatus, isSuccess, data, message, code } = response.data;

    if (httpStatus === 201 && isSuccess) {
      console.log("폴더 생성 성공:", data);
      return { success: true, data };
    } else {
      console.warn(`폴더 생성 실패 [${code}]:`, message);
      return { success: false, message };
    }
  } catch (error) {
    console.error("폴더 생성 중 에러:", error);
    return { success: false, message: "서버 통신 에러" };
  }
};

export default createFolderApi;
