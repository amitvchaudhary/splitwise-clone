import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import FriendsContainer from "../../containers/FriendsContainer";
import { User } from "../../models/classes/core.classes";
import { userService } from "../../services/user.service";

const FriendPage: React.FC<any> = () => {
  let { id } = useParams();
  const [friend, setFriend] = React.useState<User>();
  const navigate = useNavigate();

  React.useEffect(() => {
    const user = userService.getUser(id);
    if (user) {
      setFriend(user);
    } else {
      navigate("/dashboard");
    }
  }, [id])

  
  return <div className="h-full w-full">
    <FriendsContainer friend={friend}/>
  </div>;
};

export default FriendPage;
