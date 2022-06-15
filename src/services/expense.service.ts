import { SPLIT_METHOD } from "./../models/enums/core.enums";
import {
  Expense,
  Money,
  User,
  UserExpense,
} from "../models/classes/core.classes";
import { authService, AuthService } from "./auth.service";

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
      console.log("getupdated======");
      console.log(splitters);
      console.log(sharedWith);
      splitters.forEach((splitter: any) => {
        if (splitter.users && splitter.users.length > 0) {
          // It's a group
          console.log("it is a group");
          splitter.users.forEach((splitWith: User) => {
            if (!this.userExist(splitWith, sharedWithList)) {
              sharedWithList.push(this.convertUserToUserExpense(splitWith));
            }
          });
        } else {
          // It's a user
          console.log("it is a user");
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
    console.log('1');
    switch (splitMethod) {
      case SPLIT_METHOD.EQUALLY:
        return this.distributeExpenseEqually(money, sharedWith);
      default: return []
    }
  }

  distributeExpenseEqually(money: Money, sharedWith: UserExpense[]) {
    console.log('2');
    const sharedWithLocal = JSON.parse(JSON.stringify(sharedWith));
    const selectedUsers = sharedWithLocal.filter(
      (userExpense: UserExpense) => userExpense.isSelected
    );
    // console.log(money.value);
    // console.log

    if (money && money.value > 0 && sharedWithLocal.length > 0) {
      console.log('3');
      sharedWithLocal.forEach((userExpense: UserExpense) => {
        console.log('4');
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
