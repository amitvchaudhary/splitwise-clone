import * as React from "react";
import { Outlet } from "react-router-dom";
import HeaderContainer from "../../containers/HeaderContainer";

type HomeLayoutProps = {
  //
};

const HomeLayout: React.FC<any> = () => {
  return (
    <div>
      <HeaderContainer />
      <div>
        <div>Sidebar</div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
