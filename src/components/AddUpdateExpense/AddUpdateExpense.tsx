import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import * as React from "react";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import {
  Expense,
  Group,
  User,
  UserExpense,
} from "../../models/classes/core.classes";
import SWMultiSelect from "../../ui/components/SWMultiSelect";
import { InputNumber } from "primereact/inputnumber";
import { Chips } from "primereact/chips";
import { useImmer } from "use-immer";
import { expenseService } from "../../services/expense.service";
import { OverlayPanel } from "primereact/overlaypanel";
import ChoosePayer from "../ChoosePayer";
import { whichSplitMethod } from "../../utils/helpers";
import ChooseSplitOptions from "../ChooseSplitOptions";
import { react } from "@babel/types";
import { useCoreService } from "../../services/core.service";
import { authService } from "../../services/auth.service";

type UserOrGroup = User | Group;

type AddUpdateExpenseProps = {
  onAddExpense: Function;
  onAddUser: Function;
  usersAndGroups: Array<UserOrGroup>;
  addedUser: User;
  loggedInUser: User;
  draftExpense: Expense;
};

const AddUpdateExpense: React.FC<any> = (props: AddUpdateExpenseProps) => {
  const {
    onAddExpense,
    onAddUser,
    usersAndGroups,
    addedUser,
    loggedInUser,
    draftExpense,
  } = props;
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    getValues,
    watch,
  } = useForm();

  const [expense, updateExpense] = useImmer<Expense>(draftExpense);
  const payersRef: any = React.useRef();
  const splitMethodRef: any = React.useRef();
  const watchUsersAndGroups = watch("usersAndGroups");
  const watchAmount = watch("amount");
  const watchDescription = watch("description");
  const watchTags = watch("tags");
  const coreService = useCoreService();

  React.useEffect(() => {
    if (addedUser) {
      const usersAndGroupsLocal = getValues("usersAndGroups");
      if (!userExist(addedUser, usersAndGroupsLocal)) {
        setValue("usersAndGroups", [...usersAndGroupsLocal, addedUser], {shouldValidate: true});
      }
    }
  }, [addedUser?.id]);

  React.useEffect(() => {
    updateExpense((draft) => {
      let updatedList = expenseService.getUpdatedSharedWith(
        watchUsersAndGroups
      );

      updatedList = expenseService.distributeExpense(
        expense.splitMethod,
        expense.money,
        updatedList
      );
      if (updatedList) {
        draft.sharedWith = updatedList;
      }
    });
  }, [watchUsersAndGroups]);

  React.useEffect(() => {
    updateExpense((draft: Expense) => {
      draft.money.value = watchAmount;
      draft.paidBy[0].amount = watchAmount;
      const updatedList = expenseService.distributeExpense(
        expense.splitMethod,
        draft.money,
        expense.sharedWith
      );
      if (updatedList) {
        draft.sharedWith = updatedList;
      }
    });
  }, [watchAmount]);

  React.useEffect(() => {
    updateExpense((draft: Expense) => {
      draft.tags = watchTags;
    });
  }, [watchTags]);

  React.useEffect(() => {
    updateExpense((draft: Expense) => {
      draft.description = watchDescription;
    });
  }, [watchDescription]);

  const userExist = (user: User, usersAndGroupsLocal: Array<UserOrGroup>) => {
    if (user) {
      return (
        usersAndGroupsLocal.findIndex(
          (item: UserOrGroup) => item.id === user.id
        ) >= 0
      );
    }
  };

  const getFormErrorMessage = (name: any) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  const handleSelectUserOrGroup = (field: any, option: any) => {
    field.onChange([...field.value, option]);
  };

  const handleRemoveUserOrGroup = (field: any, option: any) => {
    const newSelectedUsersAndGroups = [...field.value];
    const optionIndex = newSelectedUsersAndGroups.findIndex(
      (value: any) => value.id === option.id
    );
    newSelectedUsersAndGroups.splice(optionIndex, 1);
    field.onChange(newSelectedUsersAndGroups);
  };

  const handleAddUser = (text: string) => {
    onAddUser(text);
  };

  const whoPaid = (paidByUsers: UserExpense[]) => {
    return expenseService.getPaidBy(paidByUsers);
  };

  const closeChoosePayer = () => {
    if (payersRef && payersRef.current) {
      payersRef.current.hide();
    }
  };

  const onSubmit = (data: any) => {
    if (!expenseService.isUserInvolvedInExpense(loggedInUser, expense.paidBy, expense.sharedWith, expense.splitMethod)) {
      coreService.showError("You must be involved in the transaction.");
      return;
    }

    const result = expenseService.validateDistribution(expense.splitMethod, expense.sharedWith, expense.money);

    if (result && result.isValid) {
      onAddExpense(expense);
    } else {
      coreService.showError(result.msg);
    }
  };



  return (
    <div className="flex items-center flex-col h-full w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full p-fluid">
        <div className="mb-5">
          <span className="text-gray-600 font-semibold pb-20">
            <label
              htmlFor="usersAndGroups"
              className={classNames({ "p-error": errors.usersAndGroups })}
            >
              Split with you and*
            </label>
          </span>
          <Controller
            name="usersAndGroups"
            control={control}
            defaultValue={[]}
            rules={{ required: "At least one friend is required." }}
            render={({ field, fieldState }) => (
              <SWMultiSelect
                placeholder="Select friends or groups"
                noItemsPlaceholder="Hit enter to add this person"
                onNoItems={handleAddUser}
                onRemove={(option: any) =>
                  handleRemoveUserOrGroup(field, option)
                }
                onSelect={(option: any) =>
                  handleSelectUserOrGroup(field, option)
                }
                options={usersAndGroups}
                selectedValues={field.value}
                displayValue="name"
                isError={fieldState.error}
              />
            )}
          />
          {getFormErrorMessage("usersAndGroups")}
        </div>
        <div className="mb-5">
          <span className="text-gray-600 font-semibold pb-20">
            <label
              htmlFor="amount"
              className={classNames({ "p-error": errors.amount })}
            >
              Amount*
            </label>
          </span>
          <Controller
            name="amount"
            defaultValue={0.0}
            rules={{ min: { value: 0.1, message: "Please enter some amount" } }}
            control={control}
            render={({ field, fieldState }) => (
              <InputNumber
                inputId={field.name}
                className={`${
                  fieldState.error && "p-invalid"
                } w-full p-inputtext-sm`}
                value={field.value}
                onValueChange={(e) => field.onChange(e.value)}
                mode="currency"
                currency="INR"
                currencyDisplay="code"
                locale="en-IN"
                min={0}
                showButtons
                buttonLayout="horizontal"
                incrementButtonClassName="bg-teal-500"
                decrementButtonClassName="bg-teal-500"
              />
            )}
          />

          {getFormErrorMessage("amount")}
        </div>
        <div className="mb-5">
          <span className="text-gray-600 font-semibold pb-20">
            <label
              htmlFor="description"
              className={classNames({ "p-error": errors.description })}
            >
              Description*
            </label>
          </span>
          <Controller
            name="description"
            defaultValue=""
            control={control}
            rules={{ required: "Please enter description" }}
            render={({ field, fieldState }) => (
              <InputText
                id={field.name}
                {...field}
                className={`${
                  fieldState?.error && "p-invalid"
                } w-full p-inputtext-sm`}
              />
            )}
          />

          {getFormErrorMessage("description")}
        </div>

        <div className="mb-5">
          <span className="text-gray-600 font-semibold pb-20">
            <label
              htmlFor="tags"
              className={classNames({ "p-error": errors.tags })}
            >
              Tags
            </label>
          </span>
          <Controller
            name="tags"
            defaultValue=""
            control={control}
            render={({ field, fieldState }) => (
              <Chips
                id={field.name}
                allowDuplicate={false}
                {...field}
                className={`${fieldState?.error && "p-invalid"} w-full h-11`}
              ></Chips>
            )}
          />

          {getFormErrorMessage("tags")}
        </div>
        <div className="mb-5">
          <span>Paid by</span>
          <span
            className="bg-teal-500 border border-dashed border-white px-2 pb-1 text-white rounded-lg mx-1 cursor-pointer"
            onClick={(e) => payersRef?.current.toggle(e)}
          >
            {whoPaid(expense.paidBy)}
          </span>
          <span>and split</span>
          <span
            onClick={(e) => splitMethodRef?.current.toggle(e)}
            className="bg-teal-500 border border-dashed border-white px-2 pb-1 text-white rounded-lg mx-1 cursor-pointer"
          >
            {whichSplitMethod(expense.splitMethod)}
          </span>
          <OverlayPanel ref={payersRef}>
            <ChoosePayer
              onClose={closeChoosePayer}
              expense={expense}
              updateExpense={updateExpense}
            />
          </OverlayPanel>
          <OverlayPanel ref={splitMethodRef}>
            <ChooseSplitOptions
              onClose={closeChoosePayer}
              expense={expense}
              updateExpense={updateExpense}
            />
          </OverlayPanel>
        </div>
        <div className="flex justify-end">
          <Button type="submit" label="Create" className="mt-2 bg-teal-500" />
        </div>
      </form>
    </div>
  );
};

export default AddUpdateExpense;
