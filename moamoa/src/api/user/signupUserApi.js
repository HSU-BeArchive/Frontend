// 회원가입 API(POST)
import defaultInstance from "../utils/instance";

const signupUserApi = async (loginId, password) => {
  try {
    const response = await defaultInstance.post(`/user/signup`, {
      loginId: loginId,
      password: password,
    });

    if (response.data.httpStatus === 201 && response.data.isSuccess) {
      console.log("회원가입 성공");
      return response.data.data.userId;
    } else {
      console.warn("회원가입 실패:", response.data.message);
      return null;
    }
  } catch (e) {
    console.error(e);
  }
};

export default signupUserApi;
