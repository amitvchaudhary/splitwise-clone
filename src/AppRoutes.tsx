import { Navigate, Route, Routes } from "react-router-dom";
import App from "./App";
import FriendPage from "./FriendPage";
import AuthLayout from "./layouts/AuthLayout";
import HomeLayout from "./layouts/HomeLayout";
import DashboardPage from "./pages/DashboardPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import { authService } from "./services/auth.service";

function ProtectedRoute({ children }: any) {
  let isUserLoggedIn = authService.isUserLoggedIn();
  return isUserLoggedIn ? children : <Navigate to="/auth/signin" />;
}

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="signup" element={<SignupPage />}></Route>
          <Route path="signin" element={<SigninPage />}></Route>
        </Route>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomeLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<DashboardPage />}></Route>
          <Route path="friends">
            <Route path=":id" element={<FriendPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};
