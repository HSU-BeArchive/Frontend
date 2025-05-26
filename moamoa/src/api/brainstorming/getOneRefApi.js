// 레퍼런스 하나 조회 API(GET)
import defaultInstance from "../utils/instance";

const getOneRefApi = async (folderId, referenceId) => {
  try {
    const response = await defaultInstance.get(
      `/folder/${folderId}/reference/${referenceId}`
    );

    const { httpStatus, isSuccess, data, message } = response.data;

    if (httpStatus === 200 && isSuccess) {
      console.log("레퍼런스 단일 조회 성공");
      return {
        // 레퍼런스 정보
        referenceId: data.referenceId,
        referenceName: data.referenceName,
        referenceDescription: data.referenceDescription,
        referenceImgUrl: data.referenceImgUrl,
      };
    } else {
      console.warn("레퍼런스 단일 조회 실패:", message);
      return null;
    }
  } catch (e) {
    console.error("레퍼런스 단일 조회 실패:", e);
    return null;
  }
};

export default getOneRefApi;
