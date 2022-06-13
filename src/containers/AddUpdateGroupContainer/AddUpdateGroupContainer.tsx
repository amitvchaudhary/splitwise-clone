import * as React from "react";
import AddUpdateGroup from "../../components/AddUpdateGroup";
import { AddGroupVM } from "../../models/classes/user.classes";
import { useCoreService } from "../../services/core.service";
import { userService } from "../../services/user.service";

type AddUpdateGroupContainerProps = {
  onGroupAdded: Function
};

const AddUpdateGroupContainer: React.FC<any> = (props: AddUpdateGroupContainerProps) => {
  const coreService = useCoreService();
  const users = userService.getAllUsers();

  const handleAddGroup = (data: AddGroupVM) => {
    userService.addGroup(data);
    coreService.showSuccess(data.name + ' group created successfully.');
    props.onGroupAdded();
  }

  return <div><AddUpdateGroup onAddGroup={handleAddGroup} users={users} /></div>;
};

export default AddUpdateGroupContainer;
