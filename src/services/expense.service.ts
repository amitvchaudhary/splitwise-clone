import { Currency } from "./../models/constants/core.constants";
import { expenseQuery } from "./../stores/expense/expense.query";
import {
  SPLIT_METHOD,
  USER_TRANSACTION_ACTION,
} from "./../models/enums/core.enums";
import {
  Expense,
  Money,
  User,
  UserExpense,
} from "../models/classes/core.classes";
import { authService, AuthService } from "./auth.service";
import { expenseStore } from "../stores/expense/expense.store";
import {
  ExpenseSummary,
  UserExpenseSummary,
} from "../models/classes/expense.classes";

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

  paidAmount(splitMethod: string, money: Money, amount: number) {
    if (splitMethod === SPLIT_METHOD.PERCENTAGE) {
      return expenseService.getAmountByPercentage(money.value, amount);
    } else {
      return amount;
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

  getUpdatedSharedWith(splitters: any[] = []) {
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
      default:
        return sharedWith;
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
          userExpense.amount = parseFloat(
            (money.value / selectedUsers.length).toFixed(2)
          );
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

  getAllExpenses(): Expense[] {
    const loggedInUser: User | any = this._authService.getLoggedInUser();

    // TODO: Might need to filter based on user management.
    return expenseQuery.getAll();
  }

  getUserExpenses(user: User): Expense[] {
    const loggedInUser: User | any = this._authService.getLoggedInUser();
    const expenses = expenseQuery.getAll({
      filterBy: [
        (entity) =>
          entity.addedByEmailId === loggedInUser?.emailId &&
          this.isUserInvolvedInExpense(
            user,
            entity.paidBy,
            entity.sharedWith,
            entity.splitMethod
          ),
      ],
    });

    return expenses || [];
  }

  getExpenseSummary() {
    // TODO: It can be improved further
    const loggedInUser: User | any = this._authService.getLoggedInUser();
    const expenses = this.getAllExpenses();

    if (expenses && expenses.length > 0) {
      const expenseSummary = new ExpenseSummary();

      expenses.forEach((expense: Expense) => {
        if (
          this.userExistInExpense(
            loggedInUser,
            expense.paidBy,
            expense.sharedWith
          )
        ) {
          if (this.isPayer(loggedInUser, expense.paidBy)) {
            // You are owed
            if (expense.sharedWith && expense.sharedWith.length > 0) {
              expense.sharedWith.forEach((sharedWith: UserExpense) => {
                // Except you (logged in user) all other people owe you
                if (sharedWith.user.emailId !== loggedInUser.emailId) {
                  let userExpenseSummary = this.getUserExpenseSummary(
                    sharedWith.user,
                    expenseSummary.youAreOwedUsers
                  );
                  if (!userExpenseSummary) {
                    // User doesn't exist. So create new summary and add the amount.
                    userExpenseSummary = new UserExpenseSummary();
                    userExpenseSummary.user = sharedWith.user;
                    expenseSummary.youAreOwedUsers.push(userExpenseSummary);
                  }

                  userExpenseSummary.expenses.push(expense);
                  userExpenseSummary.totalAmount += this.paidAmount(
                    expense.splitMethod,
                    expense.money,
                    sharedWith.amount
                  );
                  expenseSummary.youAreOwed += this.paidAmount(
                    expense.splitMethod,
                    expense.money,
                    sharedWith.amount
                  );
                }
              });
            }
          } else {
            // You owe
            if (expense.sharedWith && expense.sharedWith.length > 0) {
              expense.sharedWith.forEach((sharedWith: UserExpense) => {
                // Except you (logged in user) all other people owe you
                if (sharedWith.user.emailId === loggedInUser.emailId) {
                  // Considering only one user pays. Need to update code in future if there can be multiple payers.
                  // expense.paidBy[0].user will get changed.
                  const payer = expense.paidBy[0].user;
                  let userExpenseSummary = this.getUserExpenseSummary(
                    payer,
                    expenseSummary.youOweUsers
                  );
                  if (!userExpenseSummary) {
                    // User doesn't exist. So create new summary and add the amount.
                    userExpenseSummary = new UserExpenseSummary();
                    userExpenseSummary.user = payer;
                    expenseSummary.youOweUsers.push(userExpenseSummary);
                  }

                  userExpenseSummary.expenses.push(expense);
                  userExpenseSummary.totalAmount += this.paidAmount(
                    expense.splitMethod,
                    expense.money,
                    sharedWith.amount
                  );
                  expenseSummary.youOwe += this.paidAmount(
                    expense.splitMethod,
                    expense.money,
                    sharedWith.amount
                  );
                }
              });
            }
          }
        }
      });
      return expenseSummary;
    }
  }

  getAmountByPercentage(amount: number, percentage: number) {
    return (amount * percentage) / 100;
  }

  userExistInExpense(
    user: User,
    paidBy: UserExpense[],
    sharedWith: UserExpense[]
  ) {
    let userExist = false;
    if (user) {
      if (paidBy && paidBy.length > 0) {
        userExist =
          paidBy.findIndex(
            (paidBy: UserExpense) => paidBy.user.emailId === user.emailId
          ) >= 0;
      }

      if (!userExist) {
        if (sharedWith && sharedWith.length > 0) {
          userExist =
            sharedWith.findIndex(
              (sharedWith: UserExpense) =>
                sharedWith.user.emailId === user.emailId
            ) >= 0;
        }
      }
    }

    return userExist;
  }

  isPayer(user: User, paidBy: UserExpense[]) {
    let isPayer = false;
    if (user && paidBy && paidBy.length > 0) {
      isPayer =
        paidBy.findIndex(
          (paidBy: UserExpense) => paidBy.user.emailId === user.emailId
        ) >= 0;
    }

    return isPayer;
  }

  getUserExpenseSummary(user: User, userExpenseSummary: UserExpenseSummary[]) {
    let userLocal = null;
    if (user) {
      if (userExpenseSummary && userExpenseSummary.length > 0) {
        userLocal = userExpenseSummary.find(
          (item: UserExpenseSummary) => item.user.emailId === user.emailId
        );
      }
    }

    return userLocal;
  }

  deleteExpense(expense: any) {
    expenseStore.remove(expense.id);
  }

  validateDistribution(
    splitMethod: string,
    sharedWith: UserExpense[] = [],
    money: Money
  ) {
    let isValid = false;
    let total = 0;

    if (
      splitMethod === SPLIT_METHOD.EQUALLY ||
      splitMethod === SPLIT_METHOD.EXACT_AMOUNT
    ) {
      sharedWith.forEach(
        (sharedWith: UserExpense) => (total += sharedWith.amount)
      );
    } else if (splitMethod === SPLIT_METHOD.PERCENTAGE) {
      sharedWith.forEach(
        (sharedWith: UserExpense) =>
          (total += this.getAmountByPercentage(money.value, sharedWith.amount))
      );
    }

    if (Math.ceil(total) === Math.ceil(money.value)) {
      isValid = true;
    }

    if (isValid) {
      return { isValid: true, msg: "" };
    } else {
      return {
        isValid: isValid,
        msg: `The total amount ${total} doesn't match expense amount ${money.value}`,
      };
    }
  }

  isUserInvolvedInExpense(
    user: User,
    paidBy: UserExpense[] = [],
    sharedWith: UserExpense[] = [],
    splitMethod: string
  ) {
    let exist = false;
    if (user) {
      exist =
        paidBy.findIndex(
          (paidBy: UserExpense) => paidBy.user.emailId === user.emailId
        ) >= 0;

      if (!exist) {
        if (splitMethod === SPLIT_METHOD.EQUALLY) {
          exist =
            sharedWith.findIndex(
              (sharedWith: UserExpense) =>
                sharedWith.isSelected &&
                sharedWith.user.emailId === user.emailId
            ) >= 0;
        } else {
          exist =
            sharedWith.findIndex(
              (sharedWith: UserExpense) =>
                sharedWith.user.emailId === user.emailId
            ) >= 0;
        }
      }
    }
    return exist;
  }

  getExpenseBrief(expense: Expense, user?: User) {
    // TODO: It can be improved further
    const loggedInUser: User | any = this._authService.getLoggedInUser();
    let total = 0;
    let action;
    let amountText;

    if (expense.sharedWith && expense.sharedWith.length > 0) {
      if (this.isPayer(loggedInUser, expense.paidBy)) {
        // You are owed

        expense.sharedWith.forEach((sharedWith: UserExpense) => {
          if (sharedWith.user.emailId === loggedInUser.emailId) {
            return;
          }

          if (user) {
            if (user.emailId === sharedWith.user.emailId) {
              total = this.paidAmount(
                expense.splitMethod,
                expense.money,
                sharedWith.amount
              );
            }
          } else {
            total += this.paidAmount(
              expense.splitMethod,
              expense.money,
              sharedWith.amount
            );
          }
        });

        if (expense.sharedWith.length === 1) {
          if (
            expense.paidBy[0].user.emailId ===
            expense.sharedWith[0].user.emailId
          ) {
            if (Math.ceil(expense.money.value) === Math.ceil(total)) {
              action = "borrowed";
              amountText = "nothing";
            }
          } else {
            action = "lent";
            amountText = Currency.INR.symbol + total;
          }
        } else {
          action = "lent";
          amountText = Currency.INR.symbol + total;
        }

        return {
          msg: `you ${action}`,
          amountText: amountText,
          amountTextClass: "text-green-500 font-semibold",
        };
      } else {
        expense.sharedWith.forEach((sharedWith: UserExpense) => {
          // Only you owe
          if (sharedWith.user.emailId === loggedInUser.emailId) {
            total = this.paidAmount(
              expense.splitMethod,
              expense.money,
              sharedWith.amount
            );

            if (total === 0) {
              amountText = "nothing";
            } else {
              amountText = Currency.INR.symbol + total;
            }
          }
        });

        return {
          msg: `${this.getPaidBy(expense.paidBy)} lent you`,
          amountText: amountText,
          amountTextClass: "text-red-500 font-semibold",
        };
      }
    }
  }
}
export const expenseService = ExpenseService.getInstance();
