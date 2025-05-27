import { Navigate } from "react-router-dom";

// 로그인 안하면 접근 못하는 경로
const ProtectedRoute = ({ children }) => {
  const loginId = localStorage.getItem("loginId");

  return loginId ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
