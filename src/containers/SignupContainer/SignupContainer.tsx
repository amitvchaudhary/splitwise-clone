import * as React from "react";
import { useNavigate } from "react-router-dom";
import Signup from "../../components/Signup";
import { SignupVM } from "../../models/classes/auth.classes";
import { authService } from "../../services/auth.service";
import { useCoreService } from "../../services/core.service";
import { userService } from "../../services/user.service";

const SignupContainer: React.FC<any> = () => {
  const navigate = useNavigate();
  const coreService = useCoreService();

  const handleSignin = () => {
    navigate("/auth/signin");
  };

  const handleSignup = (data: SignupVM) => {
    if (data) {
      if (authService.userExist(data.email)) {
        coreService.showError("The account already exists. Please sign in.");
      } else {
        authService.registerUser(data);
        coreService.showSuccess("Thank you for registration. Please sign in.");
        navigate("/auth/signin");
      }
    }
  };

  return (
    <div className="h-full">
      <Signup onSignin={handleSignin} onSignup={handleSignup} />
    </div>
  );
};

export default SignupContainer;
