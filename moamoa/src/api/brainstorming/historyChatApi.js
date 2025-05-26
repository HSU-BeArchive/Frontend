// 채팅 기록 조회 api(GET)
import defaultInstance from "../utils/instance";

const historyChatApi = async (recommendationId) => {
  try {
    const response = await defaultInstance.get(
      `/chat/history/${recommendationId}`
    );
    const { httpStatus, isSuccess, data } = response.data;

    if (httpStatus === 200 && isSuccess && Array.isArray(data)) {
      return data.map((chat) => ({
        id: chat.chatId,
        text: chat.message,
        role: chat.messageRole,
        createdAt: chat.createdAt,
      }));
    } else {
      return [];
    }
  } catch (e) {
    console.error("채팅 기록 조회 실패:", e);
    return [];
  }
};

export default historyChatApi;
