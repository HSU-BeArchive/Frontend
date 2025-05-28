// 키워드 추출 + 빈도 (POST)
import defaultInstance from "../utils/instance";

const extractKeywordsApi = async (folderId) => {
  try {
    const response = await defaultInstance.post("/keywords/extr", {
      folderId: folderId,
    });
    return response.data;
  } catch (error) {
    console.error("키워드 추출 실패", error);
    return null;
  }
};

export default extractKeywordsApi;
