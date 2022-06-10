import * as React from "react";
import { useNavigate } from "react-router-dom";
import Signup from "../../components/Signup";

const SignupContainer: React.FC<any> = () => {
  const navigate = useNavigate();

  const handleSignin = () => {
    navigate("/auth/signin");
  };

  const handleSignup = (data: any) => {};

  return (
    <div className="h-full">
      <Signup onSignin={handleSignin} onSignup={handleSignup} />
    </div>
  );
};

export default SignupContainer;
