import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import * as React from "react";
import { useCoreService } from "../../services/core.service";
import AddUpdateExpenseContainer from "../AddUpdateExpenseContainer";
import ExpenseSummaryContainer from "../ExpenseSummaryContainer";

type DashboardContainerProps = {
  //
};

const DashboardContainer: React.FC<any> = () => {

  const [addExpenseDialog, setAddExpenseDialog] = React.useState(false);
  const coreService = useCoreService();

  const handleAddExpense = () => {
    setAddExpenseDialog(true);
  };

  const handleSettleUp = () => {};

  const handleExpenseAdded = () => {
    coreService.showSuccess("Expense added successfully.");
    setAddExpenseDialog(false);
  }

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
        <ExpenseSummaryContainer />
      </div>
      <Dialog
        visible={addExpenseDialog}
        onHide={() => setAddExpenseDialog(false)}
        breakpoints={{ "960px": "75vw", "640px": "100vw" }}
        style={{ width: "50vw" }}
        header="Add an expense"
      >
        <AddUpdateExpenseContainer onExpenseAdded={handleExpenseAdded}/>
      </Dialog>
    </div>
  );
};

export default DashboardContainer;
