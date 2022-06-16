import * as React from "react";
import { Expense, User } from "../../models/classes/core.classes";
import ExpenseItem from "../ExpenseItem";

type ExpenseListProps = {
  expenses: Expense[];
  onDelete: Function;
  user?: User;
};

const ExpenseList: React.FC<any> = (props: ExpenseListProps) => {
  const {expenses, onDelete, user} = props;

  const handleDelete = (expense: Expense) => {
    onDelete(expense);
  }

  return <div className="h-full w-full">
    {expenses && expenses.length === 0 && <div className="h-20 w-full flex items-center justify-center text-xl text-gray-700">You have not recorded any expenses yet.</div>} 
    {expenses && expenses.length > 0 && expenses.map((expense: Expense) => (
      <ExpenseItem key={expense.id} user={user} expense={expense} onDelete={handleDelete}/>
    ))}
  </div>;
};

export default ExpenseList;
