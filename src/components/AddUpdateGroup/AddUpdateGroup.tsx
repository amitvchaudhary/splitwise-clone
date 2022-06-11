import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { userService } from "../../services/user.service";
import SWMultiSelect from "../../ui/components/SWMultiSelect";

type AddUpdateGroupProps = {
  onAddGroup: Function;
};

const AddUpdateGroup: React.FC<any> = (props: AddUpdateGroupProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [users, setUsers] = React.useState<any>([]);

  React.useEffect(() => {
    const userList = userService.getAllUsers();
    if(userList) {
      setUsers(userList);
    }
  }, [])

  const onSubmit = (data: any) => {
    console.log('submit');
    console.log(data);
    props.onAddGroup(data);
    // reset();
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
            control={control}
            rules={{ required: "Name is required." }}
            render={({ field, fieldState }) => (
              <InputText
                id={field.name}
                {...field}
                autoFocus
                className={`${fieldState.invalid && 'p-invalid'} w-full p-inputtext-sm`}
              />
            )}
          />

          {getFormErrorMessage("name")}
        </div>

        <div className="mb-5">
        <span className="text-gray-600 font-semibold pb-20">
            <label
              htmlFor="users"
              className={classNames({ "p-error": errors.name })}
            >
              Users*
            </label>
          </span>
          <SWMultiSelect options={users} selectedValues={users} displayValue="name"/>
        </div>

        <div className="flex justify-end">
        <Button type="submit" label="Create" className="mt-2 bg-teal-500" />
        </div>
      </form>
      
    </div>
  );
};

export default AddUpdateGroup;
