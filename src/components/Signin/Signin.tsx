import * as React from "react";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { REGEX_EMAIL } from "../../models/constants/core.constants";

type SigninProps = {
  onSignin: Function;
  onSignup: Function;
};

const Signin: React.FC<any> = (props: SigninProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (data: any) => {
    props.onSignin(data);
    // reset();
  };

  const getFormErrorMessage = (name: any) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  return (
    <div className="flex items-center justify-center h-full w-full pr-10">
      <div className="bg-gray-100 rounded-2xl w-full p-10">
        <div className="text-3xl font-semibold mb-5">Sign In</div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
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
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
              </span>
              {getFormErrorMessage("email")}
            </div>
            <div className="mb-5">
              <span className="text-gray-600 font-semibold">
                <label
                  htmlFor="password"
                  className={classNames({ "p-error": errors.password })}
                >
                  Password*
                </label>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Password is required." }}
                  render={({ field, fieldState }) => (
                    <Password
                      id={field.name}
                      {...field}
                      toggleMask
                      feedback={false}
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
              </span>
              {getFormErrorMessage("password")}
            </div>

            <Button type="submit" label="Sign In" className="mt-2 bg-teal-500" />
          </form>
        </div>
        <Divider align="center">
          <span>OR</span>
        </Divider>
        <div className="text-center">
          <Button label="Register" onClick={() => props.onSignup()} className="p-button-text"/>
        </div>
      </div>
    </div>
  );
};

export default Signin;
