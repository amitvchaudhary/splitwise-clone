import * as React from "react";
import AddUpdateGroup from "../../components/AddUpdateGroup";
import { AddGroupVM } from "../../models/classes/user.classes";
import { useCoreService } from "../../services/core.service";
import { userService } from "../../services/user.service";

type AddUpdateGroupContainerProps = {
  onGroupAdded: Function;
};

const AddUpdateGroupContainer: React.FC<any> = (
  props: AddUpdateGroupContainerProps
) => {
  const coreService = useCoreService();
  const users = userService.getAllUsers();

  const handleAddGroup = (data: AddGroupVM) => {
    if (data.name && data.name.trim()) {
      if (!userService.groupExist(data)) {
        userService.addGroup(data);
        coreService.showSuccess(data.name + " group created successfully.");
        props.onGroupAdded();
      } else {
        coreService.showError(`Group with ${data.name} name already exist.`);
      }
    } else {
      coreService.showError("Please enter name.");
    }
  };

  return (
    <div>
      <AddUpdateGroup onAddGroup={handleAddGroup} users={users} />
    </div>
  );
};

export default AddUpdateGroupContainer;
