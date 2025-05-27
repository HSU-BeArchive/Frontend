// 폴더 순서 변경 API(PUT)
import defaultInstance from "../utils/instance";

const setFolderOrderApi = async (folderId, folderOrderAfter) => {
  const userId = localStorage.getItem("userId");
  try {
    const response = await defaultInstance.put(
      `/user/${userId}/folder/${folderId}/order`,
      {
        folderOrderAfter: folderOrderAfter,
      }
    );

    const { httpStatus, isSuccess, data, message } = response.data;

    if (httpStatus === 200 && isSuccess) {
      console.log("폴더 순서 변경 성공:", data);
      return { success: true, data };
    } else {
      console.warn(`폴더 순서 변경 실패:`, message);
      return { success: false, message };
    }
  } catch (error) {
    console.error("폴더 순서 변경 실패:", error);
    return { success: false, message: "서버 통신 에러" };
  }
};

export default setFolderOrderApi;
