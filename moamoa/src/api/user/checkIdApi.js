// 아이디 중복 체크 API(POST)
import defaultInstance from "../utils/instance";

const checkIdApi = async (loginId) => {
  try {
    const response = await defaultInstance.post("/user/check", {
      loginId,
    });
    const { httpStatus, isSuccess, message } = response.data;

    if (httpStatus === 200 && isSuccess) {
      console.log("아이디 중복체크 성공");
      return true;
    } else if (httpStatus === 409 && !isSuccess) {
      console.warn("아이디 중복", message);
      return false;
    } else {
      console.warn("아이디 중복체크 실패:", message);
      return false;
    }
  } catch (e) {
    console.error(e);
    return false;
  }
};

export default checkIdApi;
