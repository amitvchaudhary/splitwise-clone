import { Route, Routes } from "react-router-dom";
import App from "./App";
import AuthLayout from "./layouts/AuthLayout";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
          <Route path="/auth" element={<AuthLayout />}>
              <Route path="signup" element={<SignupPage />}></Route>
              <Route path="signin" element={<SigninPage />}></Route>
          </Route>
      </Route>
    </Routes>
  );
};
