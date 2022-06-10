import * as React from "react";
import { useNavigate } from "react-router-dom";
import Signin from "../../components/Signin";

const SigninContainer: React.FC<any> = () => {
  const navigate = useNavigate();
  const handleSignin = (data: any) => {};

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
