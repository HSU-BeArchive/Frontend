import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useIdValidation } from "../../hooks/useIdValidation";
import { usePwValidation } from "../../hooks/usePwValidation";
import signupUserApi from "../../api/user/signupUserApi";
import "./SignForm.scss";
import AccountInput from "../common/account/AccountInput";
import AccountButton from "../common/account/AccountButton";
import Logo from "../layout/header/Logo";
import SIGNLOGO from "../../assets/images/logo-sign.svg";

const SignupForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const { idValid, handleIdCheck } = useIdValidation(
    watch,
    setError,
    clearErrors
  ); // 아이디 유효성
  const { pwValid, checkPassword } = usePwValidation(); // 비밀번호 유효성

  // 회원 가입
  const onSubmit = async (data) => {
    if (!idValid) {
      setError("loginId", {
        type: "manual",
        message: "이미 사용하고 있는 아이디입니다",
      });
      return;
    }
    // 회원가입 api 요청
    const userId = await signupUserApi(data.loginId, data.password);
    if (!userId) {
      setError("loginId", {
        type: "manual",
        message: "이미 사용하고 있는 아이디입니다",
      });
      return;
    }
    alert("환영합니다!");
    navigate("/login"); // 로그인페이지로 이동
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <Logo width="48.18vw" height="17.5vw" src={SIGNLOGO} />
      {/* 아이디, 비밀번호 입력 창 */}
      <div className="login-form__inputs">
        <AccountInput
          placeholder="아이디를 입력해 주세요"
          {...register("loginId", { required: "아이디를 입력해 주세요" })}
          showError={!!errors.loginId}
          showCheck={idValid}
          checkButton
          onCheckClick={handleIdCheck}
        />
        <AccountInput
          placeholder="비밀번호를 입력해 주세요"
          type="password"
          {...register("password", {
            required: "비밀번호를 입력해 주세요",
            validate: checkPassword,
          })}
          showError={!!errors.password}
          showCheck={pwValid}
        />
      </div>
      {/* 에러 메세지 */}
      {
        <div className="login-form__error">
          {errors.loginId?.message || errors.password?.message || "\u00A0"}
        </div>
      }

      {/* 회원가입 버튼 */}
      <div className="login-form__buttons">
        <AccountButton
          width="20.83vw"
          height="3.91vw"
          text="회원가입"
          fSize="2.2vw"
          fWeight={600}
          disabled={!(idValid && pwValid)} // 하나라도 올바르지 않으면 비활성화
          type="submit"
        />
      </div>
    </form>
  );
};

export default SignupForm;
