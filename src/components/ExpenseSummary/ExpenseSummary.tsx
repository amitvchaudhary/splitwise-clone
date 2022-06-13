import * as React from "react";

type ExpenseSummaryProps = {
  totalBalance: number;
  owe: number;
  owed: number;
};

const ExpenseSummary: React.FC<any> = (props: ExpenseSummaryProps) => {
  const { totalBalance = 0, owe = 0, owed = 0 } = props;

  return (
    <div className="grid grid-cols-3 divide-x bg-gray-100 border-t border-b py-2">
      <span className="flex flex-col justify-center items-center">
        <div className="text-gray-600">total balance</div>
        <div
          className={`${
            totalBalance === 0
              ? "text-gray-700"
              : totalBalance > 0
              ? "text-teal-500"
              : "text-red-500"
          }`}
        >
          {totalBalance}
        </div>
      </span>
      <span className="flex flex-col justify-center items-center">
        <div className="text-gray-600">you owe</div>
        <div className="text-red-500">{owe}</div>
      </span>
      <span className="flex flex-col justify-center items-center">
        <div className="text-gray-600">you are owed</div>
        <div className="text-teal-500">{owed}</div>
      </span>
    </div>
  );
};

export default ExpenseSummary;
