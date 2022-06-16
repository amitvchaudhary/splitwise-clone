import * as React from "react";
import { Outlet } from "react-router-dom";
import Logo from "./../../assets/images/svg/splitwise-logo.svg";
import { useTypewriter } from "react-simple-typewriter";
const AuthLayout: React.FC<any> = () => {
  const { text } = useTypewriter({
    words: ["friends.", "housemates.", "partners.", "anyone!"],
    loop: 0,
  });

  return (
    <div className="flex w-full h-screen">
      <div className="w-1/2 p-20 h-full">
        <div className="flex items-center flex-col justify-center p-20 h-full">
          <div className="text-left w-full">
            <img src={Logo} className="h-20 w-20" />
          </div>
          <div className="text-left">
            <div className="text-4xl font-bold mt-8 mb-6 leading-tight">
              <div>Less stress when</div>
              <div>sharing expenses</div>
              <div>
                <span className="text-4xl font-bold">with</span>{" "}
                <span className="text-teal-500">{text}</span>
              </div>
            </div>
            <div className="text-lg font-semibold">
              Keep track of your shared expenses and balances with housemates,
              trips, groups, friends, and family.
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
