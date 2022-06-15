import { SPLIT_METHOD } from "./../models/enums/core.enums";
import {
  Expense,
  Money,
  User,
  UserExpense,
} from "../models/classes/core.classes";
import { authService, AuthService } from "./auth.service";
import { expenseStore } from "../stores/expense/expense.store";

export class ExpenseService {
  private static instance: ExpenseService;
  private _authService: AuthService;

  private constructor() {
    this._authService = authService;
  }

  static getInstance() {
    if (!ExpenseService.instance) {
      ExpenseService.instance = new ExpenseService();
    }
    return ExpenseService.instance;
  }

  createDraftExpense() {
    const loggedInUser: User | any = this._authService.getLoggedInUser();
    const draftExpense = new Expense();
    const userExpense = new UserExpense();
    userExpense.user = loggedInUser;

    draftExpense.paidBy.push(userExpense);
    draftExpense.sharedWith.push(userExpense);

    return draftExpense;
  }

  addExpense(expense: Expense) {
    if (expense) {
      const loggedInUser: User | any = this._authService.getLoggedInUser();
      const expenseLocal = JSON.parse(JSON.stringify(expense));
      expenseLocal.addedByEmailId = loggedInUser.emailId;
      expenseStore.add(expenseLocal);
    }
  }

  getPaidBy(userExpenses: UserExpense[]) {
    if (userExpenses && userExpenses.length > 0) {
      const loggedInUser: User | any = this._authService.getLoggedInUser();

      if (userExpenses.length === 1) {
        if (userExpenses[0].user.emailId === loggedInUser.emailId) {
          return "you";
        } else {
          return userExpenses[0].user.name;
        }
      } else {
        return "multiple people";
      }
    }
  }

  getUpdatedSharedWith(splitters: any[] = [], sharedWith: UserExpense[] = []) {
    const loggedInUser: User | any = this._authService.getLoggedInUser();
    let sharedWithList: UserExpense[] = [];
    sharedWithList.push(this.convertUserToUserExpense(loggedInUser));

    if (splitters && splitters.length > 0) {
      splitters.forEach((splitter: any) => {
        if (splitter.users && splitter.users.length > 0) {
          // It's a group
          splitter.users.forEach((splitWith: User) => {
            if (!this.userExist(splitWith, sharedWithList)) {
              sharedWithList.push(this.convertUserToUserExpense(splitWith));
            }
          });
        } else {
          // It's a user
          if (!this.userExist(splitter, sharedWithList)) {
            sharedWithList.push(this.convertUserToUserExpense(splitter));
          }
        }
      });
    }
    return sharedWithList;
  }

  distributeExpense(
    splitMethod: string,
    money: Money,
    sharedWith: UserExpense[] = []
  ) {
    switch (splitMethod) {
      case SPLIT_METHOD.EQUALLY:
        return this.distributeExpenseEqually(money, sharedWith);
      default: return sharedWith;
    }
  }

  distributeExpenseEqually(money: Money, sharedWith: UserExpense[]) {
    const sharedWithLocal = JSON.parse(JSON.stringify(sharedWith));
    const selectedUsers = sharedWithLocal.filter(
      (userExpense: UserExpense) => userExpense.isSelected
    );

    if (money && money.value > 0 && sharedWithLocal.length > 0) {
      sharedWithLocal.forEach((userExpense: UserExpense) => {
        if (userExpense.isSelected) {
          userExpense.amount = parseFloat((money.value / selectedUsers.length).toFixed(2));
        } else {
          userExpense.amount = 0;
        }
      });
    }

    return sharedWithLocal;
  }

  convertUserToUserExpense(user: User): UserExpense {
    const userExpense = new UserExpense();
    userExpense.user = user;
    return userExpense;
  }

  userExist(user: User, sharedWith: UserExpense[] = []) {
    if (user) {
      return (
        sharedWith.findIndex(
          (sharedWith) => sharedWith.user.emailId === user.emailId
        ) >= 0
      );
    }
  }
}
export const expenseService = ExpenseService.getInstance();
