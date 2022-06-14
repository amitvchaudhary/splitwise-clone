import { Currency, SplitMethod } from "./../constants/core.constants";
import { ID, guid } from '@datorama/akita';
import {immerable} from "immer";

export class User {
  [immerable] = true;
  id: ID = guid();
  emailId: string = "";
  name: string = "";
  password?: string = "";
  addedByEmailId?: string = ""
  iconClass: string ="pi pi-user"
}
export class Group {
  [immerable] = true;
  id: ID = guid();
  name: string = "";
  users: User[] = [];
  addedByEmailId?: string = "";
  iconClass: string ="pi pi-tag"
}

export class Activity {
  [immerable] = true;
  id: number = 0;
  createdAt: Date = new Date();
}

export class Money {
  [immerable] = true;
  currency: string = Currency.INR.value;
  value: number = 0;
}

export class UserExpense {
  [immerable] = true;
  user: User = new User();
  value: number = 0;
}

export class Expense {
  [immerable] = true;
  id: ID = guid();
  paidBy: UserExpense[] = []; // There can be multiple users.
  paidByMultiple: boolean = false;
  addedByEmailId?: string = ""; // LoggedIn user
  money: Money = new Money();
  description: string = "";
  splitMethod: string = SplitMethod.EQUALLY.value;
  createdAt: Date = new Date();
  tags: string[] = [];
  sharedWith: UserExpense[] = [];
}

export class Settlement {
  [immerable] = true;
  paidBy: User = new User();
  paidTo: User = new User();
  money: Money = new Money();
}
