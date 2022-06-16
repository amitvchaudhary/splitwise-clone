import { Navigate, Route, Routes } from "react-router-dom";
import App from "./App";
import FriendPage from "./pages/FriendPage";
import AuthLayout from "./layouts/AuthLayout";
import HomeLayout from "./layouts/HomeLayout";
import DashboardPage from "./pages/DashboardPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import { authService } from "./services/auth.service";
import ExpensesPage from "./pages/ExpensesPage";
import GroupPage from "./pages/GroupPage";

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
          element={
            <ProtectedRoute>
              <HomeLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="expenses"
            element={
              <ProtectedRoute>
                <ExpensesPage />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="friends">
            <Route
              path=":id"
              element={
                <ProtectedRoute>
                  <FriendPage />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="groups">
            <Route
              path=":id"
              element={
                <ProtectedRoute>
                  <GroupPage />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="*"
            element={<Navigate to="/auth/signup"></Navigate>}
          ></Route>
        </Route>
      </Route>
    </Routes>
  );
};
