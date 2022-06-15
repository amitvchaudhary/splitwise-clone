import * as React from "react";
import { UserExpenseSummary } from "../../models/classes/expense.classes";
import { Currency } from "../../models/constants/core.constants";
import ExpenseSummaryItem from "../ExpenseSummaryItem";

type ExpenseSummaryListProps = {
  youOweUsers: UserExpenseSummary[];
  youAreOwedUsers: UserExpenseSummary[];
};

const ExpenseSummaryList: React.FC<any> = (props: ExpenseSummaryListProps) => {

  const {youOweUsers, youAreOwedUsers} = props;

  return <div className="w-full grid grid-cols-2 gap-4">
    <div>
      <div className="font-bold text-gray-500 pl-4 mt-4 text-left">YOU OWE</div>
      {youOweUsers && youOweUsers.length === 0 && <div className="text-gray-700 w-full h-20 flex items-center justify-center font-semibold">You owe no one.</div>}
      {youOweUsers && youOweUsers.length > 0 && youOweUsers.map((userExpenseSummary: UserExpenseSummary, index: number) => (
        <ExpenseSummaryItem key={index} name={userExpenseSummary.user.name} youOwe={true} amount={userExpenseSummary.totalAmount} currency={Currency.INR.symbol} />
      ))}
    </div>
    <div>
    <div className="font-bold text-gray-500 pr-4 mt-4 text-right">YOU ARE OWED</div>
    {youAreOwedUsers && youAreOwedUsers.length === 0 && <div className="text-gray-700 font-semibold w-full h-20 flex items-center justify-center">No one owes you.</div>}
      {youAreOwedUsers && youAreOwedUsers.length > 0 && youAreOwedUsers.map((userExpenseSummary: UserExpenseSummary, index: number) => (
        <ExpenseSummaryItem key={index} name={userExpenseSummary.user.name} youOwe={false} amount={userExpenseSummary.totalAmount} currency={Currency.INR.symbol} />
      ))}
    </div>
  </div>;
};

export default ExpenseSummaryList;
