import * as React from "react";
import { Outlet } from "react-router-dom";
import HeaderContainer from "../../containers/HeaderContainer";
import SidebarContainer from "../../containers/SidebarContainer";

const HomeLayout: React.FC<any> = () => {
  return (
    <div className="h-screen flex flex-col">
      <HeaderContainer />
      <div className="flex h-full w-full">
        <div className="w-72 h-full overflow-y-auto"><SidebarContainer /></div>
        <div className="w-full h-full shadow-xl dark:border-l-gray-400 dark:border-l">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
