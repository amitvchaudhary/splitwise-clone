import * as React from "react";
import { Expense, UserExpense } from "../../models/classes/core.classes";
import { SelectButton } from "primereact/selectbutton";
import { SPLIT_METHOD } from "../../models/enums/core.enums";
import { useImmer } from "use-immer";
import { Checkbox } from "primereact/checkbox";
import SplitEqually from "../SplitEqually";
import { expenseService } from "../../services/expense.service";
import SplitByExactAmount from "../SplitByExactAmount";
import SplitByPercentage from "../SplitByPercentage";

type ChooseSplitOptionsProps = {
  expense: Expense;
  updateExpense: Function;
  onClose: Function;
};

const ChooseSplitOptions: React.FC<any> = (props: ChooseSplitOptionsProps) => {
  const { expense, updateExpense, onClose } = props;
  const splitMethodOptions = [
    { name: "=", value: SPLIT_METHOD.EQUALLY },
    { name: "1.23", value: SPLIT_METHOD.EXACT_AMOUNT },
    { name: "%", value: SPLIT_METHOD.PERCENTAGE },
  ];
  const [sharedWith, updateSharedWith] = useImmer(expense.sharedWith);

  const handleSplitMethodChange = (value: string) => {
    updateExpense((draft: Expense) => {
      draft.splitMethod = value;
      if (draft.splitMethod === SPLIT_METHOD.EQUALLY) {
        const updatedList = expenseService.distributeExpense(
          draft.splitMethod,
          draft.money,
          draft.sharedWith
        );
        if (updatedList) {
          draft.sharedWith = updatedList;
        }
      }
    });
  };

  const renderSplitMethod = (splitMethod: string) => {
    if (splitMethod === SPLIT_METHOD.EQUALLY) {
      return <SplitEqually expense={expense} updateExpense={updateExpense} />;
    } else if (splitMethod === SPLIT_METHOD.EXACT_AMOUNT) {
      return (
        <SplitByExactAmount expense={expense} updateExpense={updateExpense} />
      );
    } else if (splitMethod === SPLIT_METHOD.PERCENTAGE) {
      return (
        <SplitByPercentage expense={expense} updateExpense={updateExpense} />
      );
    }
  };

  return (
    <div className="w-80">
      <div className="w-full flex items-center justify-center">
        <SelectButton
          optionLabel="name"
          className="p-button-sm"
          value={expense.splitMethod}
          options={splitMethodOptions}
          onChange={(e) => handleSplitMethodChange(e.value)}
        />
      </div>
      <div>{renderSplitMethod(expense.splitMethod)}</div>
    </div>
  );
};

export default ChooseSplitOptions;
