// 브레인스토밍 채팅 API(POST)
import defaultInstance from "../utils/instance";

const startChatApi = async (referenceId) => {
  try {
    const response = await defaultInstance.post("/recommendation", {
      referenceId,
    });

    const { httpStatus, isSuccess, data, message } = response.data;

    if (httpStatus === 201 && isSuccess) {
      return {
        question: data.question, // 질문
        recommendationId: data.recommendationId, // 추천질문 id
      };
    } else {
      console.warn("브레인스토밍 채팅 실패:", message);
      return null;
    }
  } catch (e) {
    console.error("브레인스토밍 채팅 실패:", e);
    return null;
  }
};

export default startChatApi;
