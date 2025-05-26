// 레퍼런스 이름, 메모 수정 API(PUT)
import defaultInstance from "../utils/instance";

const editRefInfoApi = async (
  folderId,
  referenceId,
  referenceName,
  referenceDescription
) => {
  try {
    const response = await defaultInstance.put(
      `/folder/${folderId}/reference/${referenceId}`,
      {
        referenceName,
        referenceDescription,
      }
    );

    const { httpStatus, isSuccess, data, message } = response.data;

    if (httpStatus === 200 && isSuccess) {
      console.log("레퍼런스 수정 성공:", data);
      return data;
    } else {
      console.warn("레퍼런스 수정 실패:", message);
      return null;
    }
  } catch (e) {
    console.error("레퍼런스 수정 실패:", e);
    return null;
  }
};

export default editRefInfoApi;
