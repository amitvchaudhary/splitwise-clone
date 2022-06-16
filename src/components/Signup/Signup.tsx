import * as React from "react";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { REGEX_EMAIL } from "../../models/constants/core.constants";

type SignupProps = {
  onSignup: Function;
  onSignin: Function;
};

const Signup: React.FC<any> = (props: SignupProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (data: any) => {
    props.onSignup(data);
    // reset();
  };

  const getFormErrorMessage = (name: any) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  const passwordHeader = <h6>Pick a password</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </React.Fragment>
  );

  return (
    <div className="flex items-center justify-center h-full w-full pr-10">
      <div className="bg-gray-100 rounded-2xl w-full p-10">
        <div className="text-3xl font-semibold mb-5">Signup</div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
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
                    className={classNames({ "p-invalid": fieldState.invalid })}
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
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                      header={passwordHeader}
                      footer={passwordFooter}
                    />
                  )}
                />
              </span>
              {getFormErrorMessage("password")}
            </div>

            <Button type="submit" label="Register" className="mt-2 bg-teal-500" />
          </form>
        </div>
        <Divider align="center">
          <span>OR</span>
        </Divider>
        <div className="text-center">
          <Button label="Signin" onClick={() => props.onSignin()} className="p-button-text"/>
        </div>
      </div>
    </div>
  );
};

export default Signup;
