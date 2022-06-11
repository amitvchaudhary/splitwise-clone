import * as React from "react";
import { Group } from "../../models/classes/core.classes";
import NavItem from "../NavItem";

type GroupListProps = {
  groups: Group[];
};

const GroupList: React.FC<any> = (props: GroupListProps) => {
  const { groups } = props;

  return (
    <div>
      {groups && groups.length === 0 ? (
        <div className="w-full flex items-center justify-center text-gray-500">
          Start making groups.
        </div>
      ) : (
        <div className="flex flex-col gap-y-2">
          {groups &&
            groups.map((group: Group) => (
              <NavItem key={group.id} to={`groups/${group.id}`}>
                <i className="pi pi-tag mr-2"></i>
                {group.name}
              </NavItem>
            ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(GroupList);
