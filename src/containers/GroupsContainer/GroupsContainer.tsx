import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import * as React from "react";
import ExpenseList from "../../components/ExpenseList";
import { Expense, Group } from "../../models/classes/core.classes";
import { useCoreService } from "../../services/core.service";
import { expenseService } from "../../services/expense.service";
import { expenseQuery } from "../../stores/expense/expense.query";
import AddUpdateExpenseContainer from "../AddUpdateExpenseContainer";

type GroupsContainerProps = {
  group: Group
};

const GroupsContainer: React.FC<any> = (props: GroupsContainerProps) => {
  const {group} = props;
  const [addExpenseDialog, setAddExpenseDialog] = React.useState(false);
  const [expenses, setExpenses] = React.useState<Expense[]>();
  const coreService = useCoreService();

  React.useEffect(() => {
    let subscription = expenseQuery.selectAll().subscribe(() => {
      // setExpenses(expenseService.getUserExpenses(friend));
    });
    return () => subscription.unsubscribe();
  }, [group?.id]);

  const handleAddExpense = () => {
    setAddExpenseDialog(true);
  };

  const handleSettleUp = () => {
    coreService.showWarning("Sorry, Under construction.");
  };

  const handleExpenseAdded = () => {
    coreService.showSuccess("Expense added successfully.");
    setAddExpenseDialog(false);
  };

  const handleDeleteExpense = (expense: Expense) => {
    if (expense) {
      expenseService.deleteExpense(expense);
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between bg-gray-100 p-4">
        <span className="font-semibold text-2xl capitalize">{group?.name}</span>
        <span className="flex gap-x-2">
          <Button
            label="Add an expense"
            className="p-button-sm bg-orange-500 hover:bg-orange-600 text-white"
            onClick={handleAddExpense}
          />
          <Button
            label="Settle up"
            className="p-button-sm bg-teal-500 text-white"
            onClick={handleSettleUp}
          />
        </span>
      </div>
      <div className="text-3xl h-full w-full flex items-center justify-center text-gray-500 font-semibold">
        Under construction.
        {/* <ExpenseList user={group} expenses={expenses} onDelete={handleDeleteExpense}/> */}
      </div>
      <Dialog
        visible={addExpenseDialog}
        onHide={() => setAddExpenseDialog(false)}
        breakpoints={{ "960px": "75vw", "640px": "100vw" }}
        style={{ width: "50vw" }}
        header="Add an expense"
      >
        <AddUpdateExpenseContainer onExpenseAdded={handleExpenseAdded} />
      </Dialog>
    </div>
  );
};

export default GroupsContainer;
