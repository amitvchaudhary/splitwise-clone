import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import * as React from "react";
import ExpenseList from "../../components/ExpenseList";
import { Expense } from "../../models/classes/core.classes";
import { useCoreService } from "../../services/core.service";
import { expenseService } from "../../services/expense.service";
import { expenseQuery } from "../../stores/expense/expense.query";
import AddUpdateExpenseContainer from "../AddUpdateExpenseContainer";

const ExpensesContainer: React.FC<any> = () => {
  const [addExpenseDialog, setAddExpenseDialog] = React.useState(false);
  const [expenses, setExpenses] = React.useState<Expense[]>();
  const coreService = useCoreService();

  React.useEffect(() => {
    let subscription = expenseQuery.selectAll().subscribe(() => {
      setExpenses(expenseService.getAllExpenses());
    });
    return () => subscription.unsubscribe();
  }, []);

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
    <div className="flex flex-col">
      <div className="flex items-center justify-between bg-gray-100 p-4">
        <span className="font-semibold text-2xl">All Expenses</span>
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
      <div className="h-full w-full">
        <ExpenseList expenses={expenses} onDelete={handleDeleteExpense}/>
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

export default ExpensesContainer;
