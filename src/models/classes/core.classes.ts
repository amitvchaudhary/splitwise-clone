import { Currency, SplitMethod } from "./../constants/core.constants";

export class User {
  emaildId: string = "";
  name: string = "";
  password: string = "";
}

export class Group {
  id: number = 0;
  users: User[] = [];
}

export class Activity {
  id: number = 0;
  createdAt: Date = new Date();
}

export class Money {
  currency: string = Currency.INR.value;
  value: number = 0;
}

export class UserExpense {
  user: User = new User();
  value: number = 0;
}

export class Expense {
  paidBy: User = new User();
  addedBy: User = new User(); // LoggedIn user
  money: Money = new Money();
  description: string = "";
  splitMethod: string = SplitMethod.EQUALLY.value;
  createdAt: Date = new Date();
  tags: string[] = [];
  sharedWith: UserExpense[] = [];
}

export class Settlement {
  paidBy: User = new User();
  paidTo: User = new User();
  money: Money = new Money();
}
