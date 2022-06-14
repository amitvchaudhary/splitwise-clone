import { Expense, User, UserExpense } from "../models/classes/core.classes";
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
      
      console.log('getupdated======');
      console.log(splitters);
      console.log(sharedWith);
      splitters.forEach((splitter: any) => {
        if (splitter.users && splitter.users.length > 0) {
          // It's a group
          console.log('it is a group');
          splitter.users.forEach((splitWith: User) => {
            if (!this.userExist(splitWith, sharedWithList)) {
              sharedWithList.push(this.convertUserToUserExpense(splitWith));
            }
          })
        } else {
          // It's a user
          console.log('it is a user');
          if (!this.userExist(splitter, sharedWithList)) {
            sharedWithList.push(this.convertUserToUserExpense(splitter));
          }
        }
      })
    }
    return sharedWithList;
  }

  convertUserToUserExpense(user: User): UserExpense {
    const userExpense = new UserExpense();
    userExpense.user = user;
    return userExpense;
  }

  userExist(user: User, sharedWith: UserExpense[] = []) {
    if (user) {
      return sharedWith.findIndex(sharedWith => sharedWith.user.emailId === user.emailId) >= 0;
    } 
  }
}
export const expenseService = ExpenseService.getInstance();
