import * as React from "react";
import { Expense } from "../../models/classes/core.classes";
import ExpenseItem from "../ExpenseItem";

type ExpenseListProps = {
  expenses: Expense[];
  onDelete: Function
};

const ExpenseList: React.FC<any> = (props: ExpenseListProps) => {
  const {expenses, onDelete} = props;

  const handleDelete = (expense: Expense) => {
    onDelete(expense);
  }

  return <div className="h-full w-full">
    {expenses && expenses.length === 0 && <div className="h-20 w-full flex items-center justify-center text-xl text-gray-700">You have not recorded any expenses yet.</div>} 
    {expenses && expenses.length > 0 && expenses.map((expense: Expense) => (
      <ExpenseItem key={expense.id} expense={expense} onDelete={handleDelete}/>
    ))}
  </div>;
};

export default ExpenseList;
