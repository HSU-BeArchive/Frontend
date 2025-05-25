// 로그인 API(POST)
import defaultInstance from "../utils/instance";

const loginUserApi = async (loginId, password) => {
  try {
    const response = await defaultInstance.post("/user/signin", {
      loginId,
      password,
    });
    const { httpStatus, isSuccess, data, message } = response.data;

    if (httpStatus === 200 && isSuccess) {
      console.log("로그인 성공");
      return {
        loginId: data.loginId,
        userId: data.userId,
      };
    } else if ((httpStatus === 401 || httpStatus === 404) && !isSuccess) {
      console.warn("아이디 or 비밀번호 오류", message);
      return null;
    } else {
      console.warn("로그인 실패:", message);
      return null;
    }
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default loginUserApi;
