import { Button } from "primereact/button";
import * as React from "react";
import Moment from "react-moment";
import { Expense } from "../../models/classes/core.classes";

type ExpenseItemProps = {
  expense: Expense;
  onDelete: Function;
};

const ExpenseItem: React.FC<any> = (props: ExpenseItemProps) => {
  const { expense, onDelete } = props;
  const handleDelete = (expense: Expense) => {
    onDelete(expense);
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
