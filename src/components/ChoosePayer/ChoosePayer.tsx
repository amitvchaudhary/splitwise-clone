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


  const handlePaidBy = (user: UserExpense, paidByMultiple: boolean = false) => {
    if (user) {
      updateExpense((draftExpense: Expense) => {
        draftExpense.paidBy = [user];
      });
      onClose();
    }
    // else if (paidByMultiple) {
    //   updateExpense((draftExpense: Expense) => {
    //     draftExpense.paidBy=draftExpense.sharedWith;
    //     draftExpense.paidByMultiple = true;
    //   });
    // }
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
              onClick={() => handlePaidBy(sharedWith)}
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
