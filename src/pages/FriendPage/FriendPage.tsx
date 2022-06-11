import * as React from "react";
import { useParams } from "react-router-dom";

type FriendPageProps = {
  //
};

const FriendPage: React.FC<any> = () => {
  let { id } = useParams();
  
  return <div>FriendPage {id}</div>;
};

export default FriendPage;
