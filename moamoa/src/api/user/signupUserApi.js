// 회원가입 API(POST)
import defaultInstance from "../utils/instance";

const signupUserApi = async (loginId, password) => {
  try {
    const response = await defaultInstance.post(`/user/signup`, {
      loginId,
      password,
    });
    const { httpStatus, isSuccess, data, message } = response.data;

    if (httpStatus === 201 && isSuccess) {
      console.log("회원가입 성공");
      return data.userId;
    } else if (httpStatus === 409 && !isSuccess) {
      console.warn("중복된 아이디:", message);
      return null;
    } else {
      console.warn("회원가입 실패:", message);
      return null;
    }
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default signupUserApi;
