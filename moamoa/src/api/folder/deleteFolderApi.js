// 폴더 삭제 API (DELETE)
import defaultInstance from "../utils/instance";

const deleteFolderApi = async (folderId) => {
  const userId = localStorage.getItem("userId");
  try {
    const response = await defaultInstance.delete(
      `/user/${userId}/folder/${folderId}`
    );

    const { httpStatus, isSuccess, message, code } = response.data;

    if (httpStatus === 200 && isSuccess) {
      console.log("폴더 삭제 성공");
      return { success: true };
    } else {
      console.warn(`폴더 삭제 실패 [${code}]:`, message);
      return { success: false, message, code };
    }
  } catch (error) {
    console.error("폴더 삭제 중 에러:", error);
    return {
      success: false,
      message: "서버 통신 에러",
      code: "NETWORK_ERROR",
    };
  }
};

export default deleteFolderApi;

