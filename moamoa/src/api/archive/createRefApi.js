// 레퍼런스 생성 API(POST)
import defaultInstance from "../utils/instance";

const createRefApi = async (name, description, file, folderId) => {
  // FormData 객체 생성 (이미지 때문에)
  const formData = new FormData();
  formData.append("referenceName", name);
  formData.append("referenceDescription", description);
  formData.append("referenceImg", file); // img는 File 객체

  try {
    const response = await defaultInstance.post(
      `/folder/${folderId}/reference`,
      formData,
      {
        headers: {
          "Content-Type": undefined, // axios가 자동 설정
        },
      }
    );

    const { httpStatus, isSuccess, message, data } = response.data;

    if (httpStatus === 200 && isSuccess) {
      console.log("레퍼런스 업로드 성공:", message);
      return data;
    } else {
      console.warn("레퍼런스 업로드 실패:", message);
      return null;
    }
  } catch (error) {
    console.error(
      "레퍼런스 업로드 실패:",
      error.response?.data || error.message
    );
    return null;
  }
};

export default createRefApi;
