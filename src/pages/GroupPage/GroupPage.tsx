import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import GroupsContainer from "../../containers/GroupsContainer";
import { Group } from "../../models/classes/core.classes";
import { userService } from "../../services/user.service";

const GroupPage: React.FC<any> = () => {
  let { id } = useParams();
  const [group, setGroup] = React.useState<Group>();
  const navigate = useNavigate();

  React.useEffect(() => {
    const group = userService.getGroup(id);
    if (group) {
      setGroup(group);
    } else {
      navigate("/dashboard");
    }
  }, [id])

  
  return <div className="h-full w-full">
    <GroupsContainer group={group}/>
  </div>;
};

export default GroupPage;
