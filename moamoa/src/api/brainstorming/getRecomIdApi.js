// RecommendationId 조회 API(GET)
import defaultInstance from "../utils/instance";

const getRecomIdApi = async (referenceId) => {
  try {
    const response = await defaultInstance.get(
      `/recommendation/${referenceId}`
    );

    const { httpStatus, isSuccess, data, message } = response.data;

    if (httpStatus === 200 && isSuccess) {
      console.log("RecommendationId 조회 성공");
      return {
        recommendationId: data.recommendationId,
      };
    } else {
      console.warn("RecommendationId 조회 실패:", message);
      return null;
    }
  } catch (e) {
    if (e.response?.status === 404) {
      return null;
    }

    console.warn("RecommendationId 조회 실패:", e);
    return null;
  }
};

export default getRecomIdApi;
