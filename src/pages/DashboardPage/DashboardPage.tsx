import { Button } from "primereact/button";
import * as React from "react";
import { Outlet } from "react-router-dom";
import DashboardContainer from "../../containers/DashboardContainer";

type DashboardPageProps = {
  //
};

const DashboardPage: React.FC<any> = () => {
  return <div className="w-full h-full">
  <DashboardContainer />
  </div>;
};

export default DashboardPage;
