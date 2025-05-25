// 레퍼런스 생성 API(POST)
import defaultInstance from "../utils/instance";

const createRefApi = async (name, description, img, folderId) => {
  try {
    // FormData 객체 생성 (이미지 때문에)
    const formData = new FormData();
    formData.append("referenceName", name);
    formData.append("referenceDescription", description);
    formData.append("referenceImg", img); // img는 File 객체

    const response = await defaultInstance.post(
      `/folder/${folderId}/reference`,
      formData
    );
    const { httpStatus, isSuccess, data, message } = response.data;

    if (httpStatus === 200 && isSuccess) {
      console.log("레퍼런스 저장 성공");
      return {
        referenceId: data.referenceId,
        referenceName: data.referenceName,
        referenceDescription: data.referenceDescription,
        referenceImgUrl: data.referenceImgUrl,
      };
    } else if (httpStatus === 409 && !isSuccess) {
      console.warn("파일명 중복:", message);
      return null;
    } else {
      console.warn("레퍼런스 저장 실패:", message);
      return null;
    }
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default createRefApi;
