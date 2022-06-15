import { Button } from "primereact/button";
import * as React from "react";
import { User } from "../../models/classes/core.classes";
import Logo from "./../../assets/images/svg/splitwise-logo.svg";

type HeaderProps = {
  user: User;
  onLogout: Function
};

const Header: React.FC<any> = (props: HeaderProps) => {
  const { user, onLogout } = props;

  return (
    <div className="h-16 w-full bg-teal-500 flex items-center justify-center">
      <div className="px-4 w-full flex justify-between items-center">
        <div>
          <img src={Logo} className="h-10 w-10" />
        </div>
        <div className="flex items-center justify-center gap-4">
          <div>
            {user && (
              <div className="text-white font-semibold text-lg">
                {user.name ?? user.emailId}
              </div>
            )}
          </div>
          <div>
            <Button
              className="bg-teal-600 p-button-sm text-white"
              label="Logout"
              onClick={() => onLogout()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
