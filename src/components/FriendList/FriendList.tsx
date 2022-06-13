import * as React from "react";
import { NavLink } from "react-router-dom";
import { User } from "../../models/classes/core.classes";
import { userService } from "../../services/user.service";
import NavItem from "../NavItem";

type FriendListProps = {
  friends: User[];
};

function FriendList(props: FriendListProps) {
  const { friends } = props;

  return (
    <div>
      {friends && friends.length === 0 ? (
        <div className="w-full flex items-center justify-center text-gray-500">
          Start adding friends.
        </div>
      ) : (
        <div className="flex flex-col gap-y-2">
          {friends && friends.map((friend: User) => (
            <NavItem key={friend.id} to={`friends/${friend.id}`}>
               <i className={`${friend.iconClass} mr-2`}></i>
              {friend.name}
            </NavItem>
          ))}
        </div>
      )}
    </div>
  );
}

export default React.memo(FriendList);
