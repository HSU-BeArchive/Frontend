import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import "./styles/global.scss";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import MainPage from "./pages/MainPage.jsx";
import ArchivePage from "./pages/ArchivePage.jsx";
import BrainstormingPage from "./pages/BrainstormingPage.jsx";
import WordcloudPage from "./pages/WordcloudPage.jsx";
import NotFoundPage from "./pages/notfoundPage/NotFoundPage.jsx";
import Layout from "./components/layout/Layout.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" replace /> },
  { path: "/login", element: <LoginPage /> }, // 로그인 페이지
  { path: "/signup", element: <SignupPage /> }, // 회원가입 페이지

  // Layout 적용 그룹
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "main",
        element: (
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "archive/:folderId",
        element: (
          <ProtectedRoute>
            <ArchivePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "archive/:folderId/brainstorm/:refId",
        element: (
          <ProtectedRoute>
            <BrainstormingPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "archive/:folderId/wordcloud",
        element: (
          <ProtectedRoute>
            <WordcloudPage />
          </ProtectedRoute>
        ),
      },
    ],
  },

  { path: "*", element: <NotFoundPage /> }, // NotFound 페이지
]);

const App = () => <RouterProvider router={router} />;

export default App;
