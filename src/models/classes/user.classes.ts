import { User } from "./core.classes";

export class AddFriendVM {
  name: string = "";
  email: string = "";
}

export class AddGroupVM {
  name: string = "";
  users: User[] = [];
}
