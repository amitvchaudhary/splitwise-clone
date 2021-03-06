import { userInfo } from "os";
import * as React from "react";
import { Expense, UserExpense } from "../../models/classes/core.classes";

type ChoosePayerProps = {
  expense: Expense;
  updateExpense: Function;
  onClose: Function;
};

const ChoosePayer: React.FC<any> = (props: ChoosePayerProps) => {
  const { expense, updateExpense, onClose } = props;


  const handlePaidBy = (user: UserExpense, amount: number) => {
    if (user) {
      let userLocal = JSON.parse(JSON.stringify(user));
      updateExpense((draftExpense: Expense) => {
        draftExpense.paidBy = [userLocal];
        draftExpense.paidBy[0].amount = amount;
      });
      onClose();
    }
  };

  return (
    <div>
      <div className="font-bold mb-2">Choose Payer</div>
      <div>
        {expense && expense.sharedWith &&
          expense.sharedWith.length > 0 &&
          expense.sharedWith.map((sharedWith: UserExpense) => (
            <div
              className={`${
                expense.paidBy &&
                expense.paidBy.length === 1 &&
                expense.paidBy[0].user.emailId === sharedWith.user.emailId &&
                "bg-gray-100"
              } py-1 px-4 hover:bg-gray-100 text-gray-700 cursor-pointer`}
              key={sharedWith.user.id}
              onClick={() => handlePaidBy(sharedWith, expense.money.value)}
            >
              <i className={`${sharedWith.user["iconClass"]} mr-2 `}></i>
              {sharedWith?.user?.name}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ChoosePayer;
