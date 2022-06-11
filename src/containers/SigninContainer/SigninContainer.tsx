import * as React from "react";
import { useNavigate } from "react-router-dom";
import Signin from "../../components/Signin";
import { SignInVM } from "../../models/classes/auth.classes";
import { authService } from "../../services/auth.service";
import { useCoreService } from "../../services/core.service";

const SigninContainer: React.FC<any> = () => {
  const navigate = useNavigate();
  const coreService = useCoreService();

  const handleSignin = (data: SignInVM) => {
    if(authService.isUserRegistered(data)) {
      authService.setLoggedInUser(data.email);
      navigate("/home/dashboard");
    } else {
      coreService.showError("Incorrect credentials. Please try again.")
    }
  };

  const handleSignup = () => {
    navigate("/auth/signup");
  };

  return (
    <div className="h-full">
      <Signin onSignin={handleSignin} onSignup={handleSignup} />
    </div>
  );
};

export default SigninContainer;
