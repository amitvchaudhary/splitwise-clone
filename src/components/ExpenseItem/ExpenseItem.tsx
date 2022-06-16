import { Button } from "primereact/button";
import * as React from "react";
import Moment from "react-moment";
import { Expense, UserExpense } from "../../models/classes/core.classes";
import { Currency } from "../../models/constants/core.constants";
import { SPLIT_METHOD } from "../../models/enums/core.enums";
import { expenseService } from "../../services/expense.service";

type ExpenseItemProps = {
  expense: Expense;
  onDelete: Function;
};

const ExpenseItem: React.FC<any> = (props: ExpenseItemProps) => {
  const { expense, onDelete } = props;
  const summary = expenseService.getExpenseBrief(expense);
  const handleDelete = (expense: Expense) => {
    onDelete(expense);
  };

  const whoPaid = (paidByUsers: UserExpense[]) => {
    return expenseService.getPaidBy(paidByUsers);
  };

  const paidAmount = (expenseLocal: Expense) => {
    return expenseService.paidAmount(
      expenseLocal.splitMethod,
      expenseLocal.money,
      expenseLocal.paidBy[0].amount
    );
  };

  return (
    <div className="h-18 bg-gray-100 hover:bg-green-50 m-2 rounded-lg py-2 flex justify-between">
      <div className="flex items-center">
        <span className="h-full w-16 flex flex-col items-center justify-center">
          <div className="capitalize text-gray-500">
            <Moment format="MMM">{expense.createdAt}</Moment>
          </div>
          <div className="text-3xl font-semibold text-gray-500">
            <Moment format="DD">{expense.createdAt}</Moment>
          </div>
        </span>
        <span className="font-semibold text-xl">{expense.description}</span>
      </div>
      <div className="flex items-center">
        <div>
          <div className="text-gray-500 flex justify-end">
            <span>{whoPaid(expense.paidBy)}</span>
            <span className="ml-1">paid</span>
          </div>
          <div className="text-xl font-semibold flex justify-end">
            <span>{Currency.INR.symbol}</span>
            <span>{paidAmount(expense)}</span>
          </div>
        </div>
        <div className="ml-4 w-32">
          <div className="text-gray-500 flex justify-start">
            <span>{summary?.msg}</span>
          </div>
          <div className="text-xl font-semibold flex justify-start">
            <span className={summary?.amountTextClass}>{summary?.amountText}</span>
          </div>
        </div>
        <div className="ml-4">
          <Button
            id="delete_btn"
            onClick={() => handleDelete(expense)}
            icon="pi pi-times"
            className="p-button-rounded p-button-text p-button-plain p-button-sm"
            aria-label="Cancel"
          />
        </div>
      </div>
    </div>
  );
};

export default ExpenseItem;
