// 모든 레퍼런스 조회 API(GET)
import defaultInstance from "../utils/instance";

const getAllRefsApi = async (folderId) => {
  try {
    const response = await defaultInstance.get(`/folder/${folderId}/reference`);

    const { httpStatus, isSuccess, data, message } = response.data;

    if (httpStatus === 200 && isSuccess) {
      console.log("레퍼런스 전체 조회 성공");
      return data.referenceSummaryList; // 레퍼런스들 목록
    } else {
      console.warn("레퍼런스 조회 실패:", message);
      return null;
    }
  } catch (e) {
    console.error("레퍼런스 조회 실패:", e);
    return null;
  }
};

export default getAllRefsApi;
