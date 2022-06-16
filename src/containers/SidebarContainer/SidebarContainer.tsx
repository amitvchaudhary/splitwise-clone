import * as React from "react";
import NavItem from "../../components/NavItem";
import FriendListContainer from "../FriendListContainer";
import GroupListContainer from "../GroupListContainer";

const SidebarContainer: React.FC<any> = () => {
  return (
    <div className="bg-gray-100 dark:bg-slate-700 h-full px-4 py-5">
      <div className="flex flex-col gap-y-2">
        <NavItem to="/dashboard">
          <i className="pi pi-home mr-2"></i>Dashboard
        </NavItem>
        <NavItem to="/expenses">
          <i className="pi pi-list mr-2"></i>All Expenses
        </NavItem>
      </div>
      <div className="mt-2">
        <div className="mt-2">
          <FriendListContainer />
        </div>
        <div className="mt-2">
          <GroupListContainer />
        </div>
      </div>
    </div>
  );
};

export default SidebarContainer;
