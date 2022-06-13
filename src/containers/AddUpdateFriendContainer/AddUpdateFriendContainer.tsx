import * as React from "react";
import AddUpdateFriend from "../../components/AddUpdateFriend";
import { AddFriendVM } from "../../models/classes/user.classes";
import { useCoreService } from "../../services/core.service";
import { userService } from "../../services/user.service";

type AddUpdateFriendContainerProps = {
  onFriendAdded: Function;
  name?: string;
};

const AddUpdateFriendContainer: React.FC<any> = (
  props: AddUpdateFriendContainerProps
) => {
  const { name = "", onFriendAdded } = props;
  const coreService = useCoreService();

  const handleAddFriend = (data: AddFriendVM) => {
    const addedUser = userService.addUser(data);
    coreService.showSuccess(data.name + " user added successfully.");
    onFriendAdded(addedUser);
  };

  return (
    <div>
      <AddUpdateFriend onAddFriend={handleAddFriend} name={name} />
    </div>
  );
};

export default AddUpdateFriendContainer;
