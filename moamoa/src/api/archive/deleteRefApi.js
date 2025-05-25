// 레퍼런스 삭제 API(DELETE)
import defaultInstance from "../utils/instance";

const deleteRefApi = async (folderId, referenceId) => {
  try {
    const response = await defaultInstance.delete(
      `/folder/${folderId}/reference/${referenceId}`
    );

    const { httpStatus, isSuccess, message } = response.data;

    if (httpStatus === 200 && isSuccess) {
      console.log("레퍼런스 삭제 성공");
      return true;
    } else {
      console.warn("레퍼런스 삭제 실패:", message);
      return false;
    }
  } catch (e) {
    console.error("레퍼런스 삭제 실패:", e);
    return false;
  }
};

export default deleteRefApi;
