import { Group, User } from "./core.classes";

export class ExpenseVM {
  usersAndGroups: Array<User | Group> = [];
  amount: number = 0;
  description?: string = "";
  tags: string[] = [];
}
