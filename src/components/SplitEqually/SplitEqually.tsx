import { Checkbox } from "primereact/checkbox";
import * as React from "react";
import { Expense, UserExpense } from "../../models/classes/core.classes";
import { expenseService } from "../../services/expense.service";

type SplitEquallyProps = {
  expense: Expense;
  updateExpense: Function;
};

const SplitEqually: React.FC<any> = (props: SplitEquallyProps) => {
  const { expense, updateExpense } = props;

  const handleSelectUser = (index: number) => {
    console.log(index);
    console.log(expense);
    updateExpense((draft: Expense) => {
      draft.sharedWith[index].isSelected = !draft.sharedWith[index].isSelected;
      const updatedList = expenseService.distributeExpense(expense.splitMethod, draft.money, draft.sharedWith);
      if (updatedList) {
        draft.sharedWith = updatedList;
      }
    });
  };

  return (
    <div>
      <div className="font-semibold text-lg my-2">Split Equally</div>
      <div>
        {expense.sharedWith &&
          expense.sharedWith.length > 0 &&
          expense.sharedWith.map((userExpense: UserExpense, index: number) => (
            <div className={`${!userExpense.isSelected && 'line-through text-gray-400'} field-checkbox my-1 flex justify-between`} key={index}>
              <span>
                <Checkbox
                  inputId={"equal_" + userExpense.user.id}
                  checked={userExpense?.isSelected}
                  onChange={(e) => handleSelectUser(index)}
                  value={userExpense?.isSelected}
                />
                <label
                  className="ml-2"
                  htmlFor={"equal_" + userExpense.user.id}
                >
                  {userExpense.user.name}
                </label>
              </span>
              <span className="ml-4">
                <span>{expense.money.currency}</span>
                <span className="font-semibold"> {userExpense.amount}</span>
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SplitEqually;
