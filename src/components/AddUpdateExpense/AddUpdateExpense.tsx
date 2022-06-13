import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import * as React from "react";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { Group, User } from "../../models/classes/core.classes";
import SWMultiSelect from "../../ui/components/SWMultiSelect";
import { InputNumber } from "primereact/inputnumber";
import { Chips } from 'primereact/chips';

type UserOrGroup = User | Group;

type AddUpdateExpenseProps = {
  onAddExpense: Function;
  onAddUser: Function;
  usersAndGroups: Array<UserOrGroup>;
  addedUser: User;
};

const AddUpdateExpense: React.FC<any> = (props: AddUpdateExpenseProps) => {
  const { onAddExpense, onAddUser, usersAndGroups, addedUser } = props;

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    getValues,
  } = useForm();

  React.useEffect(() => {
    if (addedUser) {
      const usersAndGroupsLocal = getValues("usersAndGroups");
      if (!userExist(addedUser, usersAndGroupsLocal)) {
        setValue("usersAndGroups", [...usersAndGroupsLocal, addedUser]);
      }
    }
  }, [addedUser?.id]);

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

  const onSubmit = (data: any) => {
    console.log("submit");
    console.log(data);
    onAddExpense(data);
    // reset();
  };

  return (
    <div className="flex items-center h-full w-full p-fluid">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full ">
        <div className="mb-5">
          <span className="text-gray-600 font-semibold pb-20">
            <label
              htmlFor="usersAndGroups"
              className={classNames({ "p-error": errors.name })}
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
              className={classNames({ "p-error": errors.name })}
            >
              Amount*
            </label>
          </span>
          <Controller
            name="amount"
            defaultValue={0.0}
            rules={{ min: {value: 0.1, message: "Please enter some amount"} }}
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
              />
            )}
          />

          {getFormErrorMessage("amount")}
        </div>
        <div className="mb-5">
          <span className="text-gray-600 font-semibold pb-20">
            <label
              htmlFor="description"
              className={classNames({ "p-error": errors.name })}
            >
              Description
            </label>
          </span>
          <Controller
            name="description"
            defaultValue=""
            control={control}
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
              className={classNames({ "p-error": errors.name })}
            >
              Tags
            </label>
          </span>
          <Controller
            name="tags"
            defaultValue=""
   
            control={control}
            render={({ field, fieldState }) => (
              <Chips  id={field.name}
              allowDuplicate={false}
              {...field}
              className={`${
                fieldState?.error && "p-invalid"
              } w-full`}></Chips>
            )}
          />

          {getFormErrorMessage("tags")}
        </div>
        <div className="flex justify-end">
          <Button type="submit" label="Create" className="mt-2 bg-teal-500" />
        </div>
      </form>
    </div>
  );
};

export default AddUpdateExpense;
