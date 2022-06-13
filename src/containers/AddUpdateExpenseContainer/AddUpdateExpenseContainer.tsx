import { Dialog } from "primereact/dialog";
import * as React from "react";
import AddUpdateExpense from "../../components/AddUpdateExpense";
import AddUpdateFriend from "../../components/AddUpdateFriend";
import { User } from "../../models/classes/core.classes";
import { userService } from "../../services/user.service";
import AddUpdateFriendContainer from "../AddUpdateFriendContainer";

type AddUpdateExpenseContainerProps = {
  onExpenseAdded: Function;
};

const AddUpdateExpenseContainer: React.FC<any> = (
  props: AddUpdateExpenseContainerProps
) => {
  const { onExpenseAdded } = props;
  // const usersAndGroups = userService.getAllUsersAndGroups();
  const [addFriendDialog, setAddFriendDialog] = React.useState(false);
  const [name, setName] = React.useState("");
  const [usersAndGroups, setUsersAndGroups] = React.useState(
    userService.getAllUsersAndGroups()
  );
  const [addedUser, setAddedUser] = React.useState<User>();

  // React.useEffect(() => {

  // },[name])

  const handleAddFriend = (text: string) => {
    console.log("main ");
    console.log(text);
    setName(text);
    setAddFriendDialog(true);
  };

  const handleFriendAdded = (user: User) => {
    setName("");
    setAddFriendDialog(false);
    setUsersAndGroups(userService.getAllUsersAndGroups());
    setAddedUser(user);
  };

  return (
    <div>
      <AddUpdateExpense
        usersAndGroups={usersAndGroups}
        onAddUser={handleAddFriend}
        addedUser={addedUser}
      />
      <Dialog
        visible={addFriendDialog}
        onHide={() => setAddFriendDialog(false)}
        breakpoints={{ "960px": "75vw", "640px": "100vw" }}
        style={{ width: "50vw" }}
        header="Add Friend"
      >
        <AddUpdateFriendContainer
          onFriendAdded={handleFriendAdded}
          name={name}
        />
      </Dialog>
    </div>
  );
};

export default AddUpdateExpenseContainer;
