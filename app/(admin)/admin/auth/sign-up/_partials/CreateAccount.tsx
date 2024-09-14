"use client";
import React, { FormEvent, useState } from "react";
import InputField from "@/components/Form/InputForm";
import Btn from "@/components/Btn";
const CreateAccount = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [inputFormValues, setInputFormValues] = useState<
    Record<string, string>
  >({});

  const RegisterURL = `${process.env.HOST}register/`;

  const togglePasswordVisibility = (): void => {
    setShowPassword((prev) => !prev);
  };

  const handleFieldChange = (key: string, value: string): void => {
    setInputFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const RegisterData = {
      first_name: inputFormValues?.first_name,
      middle_name: inputFormValues?.middle_name,
      last_name: inputFormValues?.last_name,
      email: inputFormValues?.email,
      password: inputFormValues?.password,
    };
    try {
      const response = await fetch(RegisterURL, {
        method: "POST",
        body: JSON.stringify(RegisterData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      // if(response?.ok){

      // }
    } catch (e) {
      console.error("error", e);
    }
  };
  return (
    <>
      <div className="flex min-h-screen flex-1 justify-center items-center">
        <title>Create Student Account</title>
        <div className="flex flex-1 flex-col justify-center mx-4 px-1 pb-6 sm:px-6 lg:flex-none lg:px-20 xl:px-24 w-fit lg:h-fit h-screen shadow-lg rounded-lg bg-slate-400">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="mt-8 text-white text-2xl font-bold text-center leading-9 tracking-tight">
                Create your account
              </h2>
            </div>

            <div className="mt-4">
              <form
                onSubmit={handleSubmit}
                className="max-w-[300px] flex flex-col justify-center mx-auto"
              >
                <InputField
                  name="first_name"
                  label="First Name"
                  id="name"
                  labelClassName="!text-black-100"
                  labelStyle="label-top"
                  type="text"
                  wrapperClassName="flex"
                  value={inputFormValues?.first_name}
                  // fieldErrors={error?.name ?? []}
                  onChange={(e: any) => {
                    handleFieldChange("first_name", e.target.value);
                  }}
                  className="mb-2"
                  required
                />
                <InputField
                  name="middle_name"
                  label="Middle Name"
                  id="name"
                  labelClassName="!text-black-100"
                  labelStyle="label-top"
                  type="text"
                  wrapperClassName="flex"
                  value={inputFormValues?.middle_name}
                  // fieldErrors={error?.name ?? []}
                  onChange={(e: any) => {
                    handleFieldChange("middle_name", e.target.value);
                  }}
                  className="mb-2"
                />
                <InputField
                  name="last_name"
                  label="last Name"
                  id="name"
                  labelClassName="!text-black-100"
                  labelStyle="label-top"
                  type="text"
                  wrapperClassName="flex"
                  value={inputFormValues?.last_name}
                  // fieldErrors={error?.name ?? []}
                  onChange={(e: any) => {
                    handleFieldChange("last_name", e.target.value);
                  }}
                  className="mb-2"
                  required
                />

                <InputField
                  name="email"
                  label="Email Address"
                  id="email"
                  labelClassName="!text-black-100"
                  labelStyle="label-top"
                  type="email"
                  wrapperClassName="flex"
                  value={inputFormValues?.email}
                  // fieldErrors={error?.email ?? []}
                  onChange={(e: any) => {
                    handleFieldChange("email", e.target.value);
                  }}
                  className="mb-2"
                  required
                />

                <InputField
                  type={showPassword ? "text" : "password"}
                  name="password"
                  label="Password"
                  labelClassName="!text-black-100"
                  id="password"
                  required
                  key={"3"}
                  labelStyle="label-top"
                  wrapperClassName="flex"
                  className="mb-2 text-left"
                  passwordField={true}
                  value={inputFormValues?.password}
                  // fieldErrors={error?.password ?? []}
                  onChange={(e: any) => {
                    handleFieldChange("password", e.target.value);
                  }}
                  togglePasswordVisibility={togglePasswordVisibility}
                  showPassword={showPassword}
                />

                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                ></button>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center"></div>
                </div>

                <div className=" flex items-center justify-center">
                  <Btn
                    color="primary"
                    className="w-1/2"
                    type={"submit"}
                    // disabled={isLoading}
                  >
                    {"Register"}
                  </Btn>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;
