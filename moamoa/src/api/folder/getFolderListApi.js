// 폴더 전체 조회 API (GET)
import defaultInstance from "../utils/instance";

const getFolderListApi = async () => {
  const userId = localStorage.getItem("userId");

  try {
    const response = await defaultInstance.get(`/user/${userId}/folder`);

    const { httpStatus, isSuccess, data, message, code } = response.data;

    if (httpStatus === 200 && isSuccess) {
      console.log("폴더 목록 조회 성공:", data);
      return { success: true, data };
    } else {
      console.warn(`폴더 조회 실패 [${code}]:`, message);
      return { success: false, message };
    }
  } catch (error) {
    console.error("폴더 조회 중 에러:", error);
    return { success: false, message: "서버 통신 에러" };
  }
};

export default getFolderListApi;
