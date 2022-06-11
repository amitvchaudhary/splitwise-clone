import { Dialog } from "primereact/dialog";
import * as React from "react";
import GroupList from "../../components/GroupList";
import { Group } from "../../models/classes/core.classes";
import { userService } from "../../services/user.service";
import AddUpdateGroupContainer from "../AddUpdateGroupContainer";

const GroupListContainer: React.FC<any> = () => {
  const [groups, setGroups] = React.useState<Group[]>([]);
  const [addGroupDialog, setAddGroupDialog] = React.useState(false);

  const handleAddGroup = () => {
    setAddGroupDialog(true);
  };

  React.useEffect(() => {
    let subscription = userService
      .selectAllGroups()
      .subscribe((data: Group[]) => {
        console.log("called again ---");
        console.log(data);
        setGroups(data);
      });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      <div className="bg-gray-300 text-sm text-gray-600 flex justify-between px-2 rounded-sm py-1 mt-4 mb-2">
        <span>GROUPS</span>
        <span className="cursor-pointer" onClick={handleAddGroup}>
          + Add
        </span>
      </div>
      <GroupList groups={groups} />
      <Dialog
        visible={addGroupDialog}
        onHide={() => setAddGroupDialog(false)}
        breakpoints={{ "960px": "75vw", "640px": "100vw" }}
        style={{ width: "50vw" }}
        header="Create Group"
      >
        <AddUpdateGroupContainer
          onGroupAdded={() => setAddGroupDialog(false)}
        />
      </Dialog>
    </div>
  );
};

export default React.memo(GroupListContainer);
