import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { REGEX_EMAIL } from "../../models/constants/core.constants";

type AddUpdateFriendProps = {
  onAddFriend: Function;
  name?: string;
};

const AddUpdateFriend: React.FC<any> = (props: AddUpdateFriendProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { onAddFriend, name = ""} = props;

  const onSubmit = (data: any, e: any) => {
    onAddFriend(data);
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
            defaultValue={name}
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
          <span className="text-gray-600 font-semibold">
            <label
              htmlFor="email"
              className={classNames({ "p-error": !!errors.email })}
            >
              Email*
            </label>
            <Controller
              name="email"
              defaultValue=""
              control={control}
              rules={{
                required: "Email is required.",
                pattern: {
                  value: REGEX_EMAIL,
                  message: "Invalid email address. E.g. example@email.com",
                },
              }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={`${fieldState.invalid && 'p-invalid'} p-inputtext-sm w-full`}
                />
              )}
            />
          </span>
          {getFormErrorMessage("email")}
        </div>

        <div className="flex justify-end">
        <Button type="submit" label="Add" className="mt-2 bg-teal-500" />
        </div>
      </form>
    </div>
  );
};

export default AddUpdateFriend;
