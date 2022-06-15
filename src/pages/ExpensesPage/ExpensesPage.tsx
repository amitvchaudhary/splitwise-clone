import * as React from "react";
import ExpensesContainer from "../../containers/ExpensesContainer";

const ExpensesPage: React.FC<any> = () => {
  return (
    <div className="w-full h-full">
      <ExpensesContainer />
    </div>
  );
};

export default ExpensesPage;
