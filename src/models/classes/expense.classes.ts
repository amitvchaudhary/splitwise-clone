import { Expense, User } from "./core.classes";

export class UserExpenseSummary {
  user: User = new User();
  expenses: Expense[] = [];
  totalAmount: number = 0;
}

export class ExpenseSummary {
  youOwe: number = 0;
  youAreOwed: number = 0;
  youOweUsers: UserExpenseSummary[] = [];
  youAreOwedUsers: UserExpenseSummary[] = [];
}


