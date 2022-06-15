import * as React from "react";
import { Currency } from "../../models/constants/core.constants";

type ExpenseSummaryProps = {
  // totalBalance: number;
  youAreOwed: number;
  youOwe: number;
};

const ExpenseSummary: React.FC<any> = (props: ExpenseSummaryProps) => {
  const { youAreOwed = 0, youOwe = 0 } = props;

  return (
    <div className="grid grid-cols-3 divide-x bg-gray-100 border-t border-b py-2">
      <span className="flex flex-col justify-center items-center">
        <div className="text-gray-600">total balance</div>
        <div
          className={`${
            (youAreOwed - youOwe) === 0
              ? "text-gray-700"
              : (youAreOwed - youOwe) > 0
              ? "text-teal-500"
              : "text-red-500"
          }`}
        >
          {Currency.INR.symbol}{youAreOwed - youOwe}
        </div>
      </span>
      <span className="flex flex-col justify-center items-center">
        <div className="text-gray-600">you owe</div>
        <div className="text-red-500">{Currency.INR.symbol}{youOwe}</div>
      </span>
      <span className="flex flex-col justify-center items-center">
        <div className="text-gray-600">you are owed</div>
        <div className="text-teal-500">{Currency.INR.symbol}{youAreOwed}</div>
      </span>
    </div>
  );
};

export default ExpenseSummary;
