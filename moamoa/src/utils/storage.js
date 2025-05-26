// 로컬스토리지에서 RecommendationId 가져오기
export const getRecommendId = (refId) => {
  const stored = localStorage.getItem(`recommendationId-${refId}`);
  return stored ? Number(stored) : null;
};

// 로컬스토리지에서 RecommendationId 저장하기
export const setRecommendId = (refId, id) => {
  localStorage.setItem(`recommendationId-${refId}`, id);
};
