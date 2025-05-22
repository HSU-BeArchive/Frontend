import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import "./styles/global.scss";
import LoginPage from "./pages/loginPage/LoginPage.jsx";
import SignupPage from "./pages/signupPage/SignupPage.jsx";
import MainPage from "./pages/MainPage.jsx";
import ArchivePage from "./pages/archivePage/ArchivePage.jsx";
import BrainstormingPage from "./pages/BrainstormingPage.jsx";
import WordcloudPage from "./pages/wordcloudPage/WordcloudPage.jsx";
import NotFoundPage from "./pages/notfoundPage/NotFoundPage.jsx";
import Layout from "./components/layout/Layout.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" replace /> },
  { path: "/login", element: <LoginPage /> }, // 로그인 페이지
  { path: "/signup", element: <SignupPage /> }, // 회원가입 페이지

  // Layout 적용 그룹
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "main", element: <MainPage /> }, // 메인 페이지
      { path: "archive/:folderId", element: <ArchivePage /> }, // 아카이브 페이지
      {
        path: "archive/:folderId/brainstorm/:refId",
        element: <BrainstormingPage />,
      }, // 브레인스토밍 페이지
      {
        path: "archive/:folderId/wordcloud",
        element: <WordcloudPage />,
      }, // 시각화 페이지
    ],
  },

  { path: "*", element: <NotFoundPage /> }, // NotFound 페이지
]);

const App = () => <RouterProvider router={router} />;

export default App;
