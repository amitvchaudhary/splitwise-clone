import * as React from "react";
import DashboardContainer from "../../containers/DashboardContainer";

const DashboardPage: React.FC<any> = () => {
  return (
    <div className="w-full h-full dark:bg-slate-700">
      <DashboardContainer />
    </div>
  );
};

export default DashboardPage;
