import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { User } from "../../models/classes/core.classes";
import { userService } from "../../services/user.service";
import SWMultiSelect from "../../ui/components/SWMultiSelect";

type AddUpdateGroupProps = {
  onAddGroup: Function;
  users: User[];
};

const AddUpdateGroup: React.FC<any> = (props: AddUpdateGroupProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const {onAddGroup, users = []} = props;

  const handleSelectUser = (field: any, option: any) => {
    field.onChange([...field.value, option]);
  };

  const handleRemoveUser = (field: any, option: any) => {
    const newSelectedUsers = [...field.value];
    const optionIndex = newSelectedUsers.findIndex(
      (value: any) => value.id === option.id
    );
    newSelectedUsers.splice(optionIndex, 1);
    field.onChange(newSelectedUsers);
  };

  const onSubmit = (data: any) => {
    onAddGroup(data);
  };

  const getFormErrorMessage = (name: any) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  return (
    <div className="flex items-center h-full w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
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

        <div className="mb-5">
          <span className="text-gray-600 font-semibold pb-20">
            <label
              htmlFor="users"
              className={classNames({ "p-error": errors.users })}
            >
              Users*
            </label>
          </span>
          <Controller
            name="users"
            control={control}
            defaultValue={[]}
            rules={{ required: "At least one friend is required." }}
            render={({ field, fieldState }) => (
              <SWMultiSelect
                placeholder="Select users"
                onRemove={(option: any) =>
                  handleRemoveUser(field, option)
                }
                onSelect={(option: any) =>
                  handleSelectUser(field, option)
                }
                options={users}
                selectedValues={field.value}
                displayValue="name"
                isError={fieldState.error}
              />
            )}
          />
          {getFormErrorMessage("users")}
        </div>

        <div className="flex justify-end">
          <Button type="submit" label="Create" className="mt-2 bg-teal-500" />
        </div>
      </form>
    </div>
  );
};

export default AddUpdateGroup;
