import * as React from "react";
import { useNavigate } from "react-router";
import Header from "../../components/Header";
import { authService } from "../../services/auth.service";

const HeaderContainer: React.FC<any> = () => {
 
  const user = authService.getLoggedInUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.setLoggedInUser("");
    navigate("/auth/signin");
  }
 
  return <div><Header user={user} onLogout={handleLogout}/></div>;
};

export default HeaderContainer;
