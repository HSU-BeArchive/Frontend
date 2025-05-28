// 추출된 키워드 + 빈도 조회 (GET)
import defaultInstance from "../utils/instance";

const getKeywordsByFolderIdApi = async (folderId) => {
  try {
    const response = await defaultInstance.get(`/keywords/folder/${folderId}`);
    return response.data;
  } catch (error) {
    console.error("키워드 조회 실패", error);
    return null;
  }
};

export default getKeywordsByFolderIdApi;