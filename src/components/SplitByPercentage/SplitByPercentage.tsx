import { InputNumber } from "primereact/inputnumber";
import * as React from "react";
import { Expense, UserExpense } from "../../models/classes/core.classes";

type SplitByPercentageProps = {
  expense: Expense;
  updateExpense: Function;
};

const SplitByPercentage: React.FC<any> = (props: SplitByPercentageProps) => {
  const { expense, updateExpense } = props;

  const updatePercentage = (index: number, percentage: number = 0) => {
    updateExpense((draft: Expense) => {
      draft.sharedWith[index].amount = percentage;
    })
  };

  return (
    <div className="w-full">
      <div className="font-semibold text-lg my-2">Split by Percentage</div>
      <div className="w-full">
        {expense.sharedWith &&
          expense.sharedWith.length > 0 &&
          expense.sharedWith.map((userExpense: UserExpense, index: number) => (
            <div
              className={`my-1 flex justify-between items-center`}
              key={index}
            >
              <span>
                <label className="" htmlFor={"percentage_" + userExpense.user.id}>
                  {userExpense.user.name}
                </label>
              </span>
              <span className="ml-4">
                <InputNumber
                  inputId={"percentage_" + userExpense.user.id}
                  value={userExpense.amount}
                  onValueChange={(e) => updatePercentage(index, e.value || 0)}
                  suffix="%"
                  min={0}
                  maxFractionDigits={2}
                  inputClassName="h-8"
                  size={6}
                  showButtons
                  incrementButtonClassName="bg-teal-500 h-4"
                  decrementButtonClassName="bg-teal-500 h-4"
                />
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SplitByPercentage;
