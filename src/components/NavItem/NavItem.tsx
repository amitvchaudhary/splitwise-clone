import * as React from "react";
import { NavLink } from "react-router-dom";

type NavItemProps = {
  to: string;
  children: React.ReactNode;
};

const NavItem: React.FC<any> = (props: NavItemProps) => {
  const { to, children } = props;
  
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <span
          className={
            isActive
              ? "text-teal-500 font-semibold border-l-8 pl-2 border-teal-500"
              : "text-gray-700 font-semibold border-l-8 pl-2 border-transparent"
          }
        >
          {children}
        </span>
      )}
    </NavLink>
  );
};

export default NavItem;
