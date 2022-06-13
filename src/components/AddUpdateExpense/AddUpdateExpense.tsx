import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import * as React from "react";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { Group, User } from "../../models/classes/core.classes";
import SWMultiSelect from "../../ui/components/SWMultiSelect";

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

      const usersOrGroupsLocal = getValues("usersOrGroups");
      if(!userExist(addedUser, usersOrGroupsLocal)) {
        setValue("usersOrGroups", [...usersOrGroupsLocal, addedUser]);
      }
    }
  }, [addedUser?.id]);

  const userExist = (user: User, usersAndGroupsLocal: Array<UserOrGroup>) => {
    if (user) {
      return usersAndGroupsLocal.findIndex((item: UserOrGroup) => item.id === user.id) >= 0; 
    }
  }

  const getFormErrorMessage = (name: any) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };
  const handleSelectUserOrGroup = (field: any, option: any) => {
    field.onChange([...field.value, option]);
  };

  const handleRemoveUserOrGroup = (field: any, option: any) => {
    const newSelectedUsersOrGroups = [...field.value];
    const optionIndex = newSelectedUsersOrGroups.findIndex(
      (value: any) => value.id === option.id
    );
    newSelectedUsersOrGroups.splice(optionIndex, 1);
    field.onChange(newSelectedUsersOrGroups);
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
    <div className="flex items-center h-full w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="mb-5">
          <span className="text-gray-600 font-semibold pb-20">
            <label
              htmlFor="usersOrGroups"
              className={classNames({ "p-error": errors.name })}
            >
              Split with you and*
            </label>
          </span>
          <Controller
            name="usersOrGroups"
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
                className={`${fieldState.error && "border-red-500"} `}
              />
            )}
          />
          {getFormErrorMessage("users")}
        </div>
        <div className="mb-5">
          <span className="text-gray-600 font-semibold pb-20">
            <label
              htmlFor="name"
              className={classNames({ "p-error": errors.name })}
            >
              Name*
            </label>
          </span>
          <Controller
            name="name"
            defaultValue=""
            control={control}
            rules={{ required: "Name is required." }}
            render={({ field, fieldState }) => (
              <InputText
                id={field.name}
                {...field}
                autoFocus
                className={`${
                  fieldState.invalid && "p-invalid"
                } w-full p-inputtext-sm`}
              />
            )}
          />

          {getFormErrorMessage("name")}
        </div>

        <div className="flex justify-end">
          <Button type="submit" label="Create" className="mt-2 bg-teal-500" />
        </div>
      </form>
    </div>
  );
};

export default AddUpdateExpense;
