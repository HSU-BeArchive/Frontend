import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import App from "./App.jsx";
import LoginPage from "./pages/loginPage/LoginPage.jsx";
import SignupPage from "./pages/signupPage/SignupPage.jsx";
import MainPage from "./pages/mainPage/MainPage.jsx";
import ArchivePage from "./pages/archivePage/ArchivePage.jsx";
import BrainstormingPage from "./pages/brainstormingPage/BrainstormingPage.jsx";
import WordcloudPage from "./pages/wordcloudPage/WordcloudPage.jsx";
import NotFoundPage from "./pages/notfoundPage/NotFoundPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // 공통 컴포넌트
    children: [
      { path: "", element: <Navigate to="/login" replace /> },
      { path: "login", element: <LoginPage /> }, // 로그인 페이지
      { path: "signup", element: <SignupPage /> }, // 회원가입 페이지
      { path: "main", element: <MainPage /> }, // 메인 페이지
      { path: "main/:folderId", element: <ArchivePage /> }, // 아카이브 페이지
      { path: "main/:folderId/:fileId", element: <BrainstormingPage /> }, // 브레인스토밍 페이지
      { path: "wordcloud", element: <WordcloudPage /> }, // 시각화 페이지
      { path: "*", element: <NotFoundPage /> }, // 404 페이지
    ],
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
