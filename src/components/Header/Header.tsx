import { Button } from "primereact/button";
import * as React from "react";
import { User } from "../../models/classes/core.classes";
import Logo from "./../../assets/images/svg/splitwise-logo.svg";
import { InputSwitch } from 'primereact/inputswitch';
import { useCoreService } from "../../services/core.service";

type HeaderProps = {
  user: User;
  onLogout: Function
};

const Header: React.FC<any> = (props: HeaderProps) => {
  const { user, onLogout } = props;
  const coreService = useCoreService();
  const [isLight, setIsLight] = React.useState(true);

  const hanldeTheme = () => {
    coreService.toggleTheme();
    setIsLight(!isLight);
  }

  return (
    <div className="h-16 w-full dark:bg-slate-900/75 bg-teal-500 flex items-center justify-center">
      <div className="px-4 w-full flex justify-between items-center">
        <div>
          <img src={Logo} className="h-10 w-10" />
        </div>
        <div className="flex items-center justify-center gap-4">
         <div className="h-full flex items-center justify-center">
         <i className={`text-white text-xl mr-3 pi ${isLight ? 'pi-moon' : 'pi-sun'}`}></i><InputSwitch checked={isLight} onChange={hanldeTheme} />
         </div>
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
