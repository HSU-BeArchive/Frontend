// 브레인스토밍 채팅 보내기 API(POST)
import defaultInstance from "../utils/instance";

const sendChatApi = async ({ recommendationId, sendMsg }) => {
  try {
    // 로컬스토리지에서 userId 가져오기
    const userId = Number(localStorage.getItem("userId"));
    if (!userId) {
      console.warn("userId가 로컬스토리지에 없음");
      return null;
    }

    const response = await defaultInstance.post("/chat", {
      userId,
      recommendationId,
      message: sendMsg,
    });

    const { httpStatus, isSuccess, data, message } = response.data;

    if (httpStatus === 201 && isSuccess) {
      return {
        aiMessage: data.message, // AI의 채팅
        messageRole: data.messageRole, // "AI"
        createdAt: data.createdAt,
      };
    } else {
      console.warn("채팅 전송 실패:", message);
      return null;
    }
  } catch (e) {
    console.error("채팅 전송 실패:", e);
    return null;
  }
};

export default sendChatApi;
