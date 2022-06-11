import * as React from "react";
import AddUpdateFriend from "../../components/AddUpdateFriend";
import { AddFriendVM } from "../../models/classes/user.classes";
import { useCoreService } from "../../services/core.service";
import { userService } from "../../services/user.service";

type AddUpdateFriendContainerProps = {
  onFriendAdded: Function
};

const AddUpdateFriendContainer: React.FC<any> = (props: AddUpdateFriendContainerProps) => {

  const coreService = useCoreService();

  const handleAddFriend = (data: AddFriendVM) => {
    userService.addUser(data);
    coreService.showSuccess(data.name + ' added successfully.');
    props.onFriendAdded();
  }

  return <div><AddUpdateFriend onAddFriend={handleAddFriend}/></div>;
};

export default AddUpdateFriendContainer;
