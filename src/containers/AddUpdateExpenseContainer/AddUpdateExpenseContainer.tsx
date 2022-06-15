import { Dialog } from "primereact/dialog";
import * as React from "react";
import AddUpdateExpense from "../../components/AddUpdateExpense";
import { Expense, User } from "../../models/classes/core.classes";
import { authService } from "../../services/auth.service";
import { expenseService } from "../../services/expense.service";
import { userService } from "../../services/user.service";
import AddUpdateFriendContainer from "../AddUpdateFriendContainer";

type AddUpdateExpenseContainerProps = {
  onExpenseAdded: Function;
};

const AddUpdateExpenseContainer: React.FC<any> = (
  props: AddUpdateExpenseContainerProps
) => {
  const { onExpenseAdded } = props;
  const [addFriendDialog, setAddFriendDialog] = React.useState(false);
  const [name, setName] = React.useState("");
  const [usersAndGroups, setUsersAndGroups] = React.useState(
    userService.getAllUsersAndGroups()
  );
  const [addedUser, setAddedUser] = React.useState<User>();
  const loggedInUser = authService.getLoggedInUser();
  const draftExpense = expenseService.createDraftExpense();

  const handleAddFriend = (text: string) => {
    setName(text);
    setAddFriendDialog(true);
  };

  const handleFriendAdded = (user: User) => {
    setName("");
    setAddFriendDialog(false);
    setUsersAndGroups(userService.getAllUsersAndGroups());
    setAddedUser(user);
  };

  const handleAddExpense = (expense: Expense) => {
    if (expense) {
      expenseService.addExpense(expense);
      onExpenseAdded();
    }
  }

  return (
    <div>
      <AddUpdateExpense
        usersAndGroups={usersAndGroups}
        onAddUser={handleAddFriend}
        addedUser={addedUser}
        onAddExpense={handleAddExpense}
        loggedInUser={loggedInUser}
        draftExpense={draftExpense}
      />
      <Dialog
        visible={addFriendDialog}
        onHide={() => setAddFriendDialog(false)}
        breakpoints={{ "960px": "75vw", "640px": "100vw" }}
        style={{ width: "50vw" }}
        header="Add Friend"
      >
        <AddUpdateFriendContainer
          onFriendAdded={handleFriendAdded}
          name={name}
        />
      </Dialog>
    </div>
  );
};

export default AddUpdateExpenseContainer;
