import { Dialog } from "primereact/dialog";
import * as React from "react";
import FriendList from "../../components/FriendList";
import { User } from "../../models/classes/core.classes";
import { userService } from "../../services/user.service";
import AddUpdateFriendContainer from "../AddUpdateFriendContainer";

const FriendListContainer = () => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [addFriendDialog, setAddFriendDialog] = React.useState(false);

  const handleAddFriend = () => {
    setAddFriendDialog(true);
  };

  React.useEffect(() => {
    let subscription = userService
      .selectAllUsers()
      .subscribe((data: User[]) => {
        console.log("called again ---");
        console.log(data);
        setUsers(data);
      });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      <div className="bg-gray-300 text-sm text-gray-600 flex justify-between px-2 rounded-sm py-1 mt-4 mb-2">
        <span>FRIENDS</span>
        <span className="cursor-pointer" onClick={handleAddFriend}>
          + Add
        </span>
      </div>
      <FriendList friends={users} />
      <Dialog
        visible={addFriendDialog}
        onHide={() => setAddFriendDialog(false)}
        breakpoints={{ "960px": "75vw", "640px": "100vw" }}
        style={{ width: "50vw" }}
        header="Add Friend"
      >
        <AddUpdateFriendContainer
          onFriendAdded={() => setAddFriendDialog(false)}
        />
      </Dialog>
    </div>
  );
};

export default React.memo(FriendListContainer);
