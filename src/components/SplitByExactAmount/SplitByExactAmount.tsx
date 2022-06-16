import { InputNumber } from "primereact/inputnumber";
import * as React from "react";
import { Expense, UserExpense } from "../../models/classes/core.classes";

type SplitByExactAmountProps = {
  expense: Expense;
  updateExpense: Function;
};

const SplitByExactAmount: React.FC<any> = (props: SplitByExactAmountProps) => {
  const { expense, updateExpense } = props;

  const updateAmount = (index: number, amount: number = 0) => {
    updateExpense((draft: Expense) => {
      draft.sharedWith[index].amount = amount;
    })
  };

  return (
    <div className="w-full">
      <div className="font-semibold text-lg my-2">Split by Exact Amounts</div>
      <div className="w-full">
        {expense.sharedWith &&
          expense.sharedWith.length > 0 &&
          expense.sharedWith.map((userExpense: UserExpense, index: number) => (
            <div
              className={`my-1 flex justify-between items-center`}
              key={index}
            >
              <span>
                <label className="" htmlFor={"exact_" + userExpense.user.id}>
                  {userExpense.user.name}
                </label>
              </span>
              <span className="ml-4">
                <InputNumber
                  inputId={"exact_" + userExpense.user.id}
                  value={userExpense.amount}
                  onValueChange={(e) => updateAmount(index, e.value || 0)}
                  mode="currency"
                  currency="INR"
                  currencyDisplay="code"
                  locale="en-IN"
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

export default SplitByExactAmount;
