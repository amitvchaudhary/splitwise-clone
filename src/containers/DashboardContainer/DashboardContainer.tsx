import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import * as React from "react";
import ExpenseSummary from "../../components/ExpenseSummary";
import ExpenseSummaryList from "../../components/ExpenseSummaryList";
// import { ExpenseSummary as ExpenseSummaryVM} from "../../models/classes/expense.classes";
import { useCoreService } from "../../services/core.service";
import { expenseService } from "../../services/expense.service";
import { expenseQuery } from "../../stores/expense/expense.query";
import AddUpdateExpenseContainer from "../AddUpdateExpenseContainer";

type DashboardContainerProps = {
  //
};

const DashboardContainer: React.FC<any> = () => {
  const [addExpenseDialog, setAddExpenseDialog] = React.useState(false);
  const [expenseSummary, setExpenseSummary] = React.useState<any>(null);
  const coreService = useCoreService();

  React.useEffect(() => {
    let subscription = expenseQuery.selectAll().subscribe(() => {

      setExpenseSummary(expenseService.getExpenseSummary());
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleAddExpense = () => {
    setAddExpenseDialog(true);
  };

  const handleSettleUp = () => {
    coreService.showWarning("Sorry, Under construction.")
  };

  const handleExpenseAdded = () => {
    coreService.showSuccess("Expense added successfully.");
    setAddExpenseDialog(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between bg-gray-100 p-4">
        <span className="font-semibold text-2xl">Dashboard</span>
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
      <div>
        <ExpenseSummary
          youOwe={expenseSummary?.youOwe}
          youAreOwed={expenseSummary?.youAreOwed}
        />
        <ExpenseSummaryList
          youOweUsers={expenseSummary?.youOweUsers}
          youAreOwedUsers={expenseSummary?.youAreOwedUsers}
        />
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

export default DashboardContainer;
