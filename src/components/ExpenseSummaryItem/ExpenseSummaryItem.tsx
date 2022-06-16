import * as React from "react";

type ExpenseSummaryItemProps = {
  name: string;
  youOwe?: boolean;
  amount: number;
  currency: string;
};

const ExpenseSummaryItem: React.FC<any> = (props: ExpenseSummaryItemProps) => {
  const { name, youOwe, amount, currency } = props;
  return (
    <div className={`m-2 rounded-lg px-4 py-2 ${youOwe ? "bg-red-50" : "bg-green-50"}`}>
      <div className="font-semibold">{name}</div>
      <div className={`${youOwe ? "text-red-500" : "text-teal-500"}`}>
        <span className="mr-1">{youOwe ? "you owe" : "owes you"}</span>
        <span className="font-semibold">
          {currency}
          {amount.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default ExpenseSummaryItem;
