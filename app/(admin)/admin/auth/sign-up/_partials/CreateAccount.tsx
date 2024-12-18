"use client";
import React, { FormEvent, useState } from "react";
import InputField from "@/components/Form/InputForm";
import Btn from "@/components/Btn";
import Link from "next/link";
import { routes } from "@/utils/routes";
import { toast } from "react-toastify";
import SelectField from "@/components/Form/SelectField";
import Spinner from "@/components/Spinner/Spinner";
import { useRouter } from "next/navigation";
import VerifyOtp from "@/components/Elements/Authentication/VerifyOtp";

const CreateAccount = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputFormValues, setInputFormValues] = useState<
    Record<string, string>
  >({});
  const [userFormValues, setUserFormValues] = useState<Record<string, string>>(
    {}
  );
  const [selectValues, setSelectValues] = useState<Record<string, any>>({});
  const stateOptions: any = [
    { label: "Male", value: 1 },
    { label: "Female", value: 0 },
    { label: "Both", value: null },
  ];
  const handleStateChange = (name: string, choice: any): void => {
    // let idArray : string[] = [];
    // idArray.push(choice?.value)
    setSelectValues((values) => ({ ...values, [name]: choice?.value }));
  };
  const RegisterURL = `${process.env.HOST}register/`;

  const togglePasswordVisibility = (): void => {
    setShowPassword((prev) => !prev);
  };

  const handleFieldChange = (key: string, value: string): void => {
    setInputFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleUserFieldChange = (key: string, value: string): void => {
    setUserFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    const combineData = {
      user_data: {
        first_name: inputFormValues?.first_name,
        middle_name: inputFormValues?.middle_name,
        last_name: inputFormValues?.last_name,
        email: inputFormValues?.email,
        password: inputFormValues?.password,
      },
      user_profile_data: {
        address: userFormValues?.address,
        phone_number: userFormValues?.phone_number,
        date_of_birth: userFormValues?.date_of_birth,
        gender: selectValues?.gender,
        bio: userFormValues?.bio,
      },
    };
    try {
      const response = await fetch(RegisterURL, {
        method: "POST",
        body: JSON.stringify(combineData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response?.ok && data) {
        toast.success(data?.message);
        router.push(routes.ADMIN_VERIFY_OTP);
      } else {
        toast.error("something went wrong");
      }
    } catch (e) {
      console.error("error", e);
    }
    finally{
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="flex min-h-screen flex-1 justify-center items-center">
        <title>Create Student Account</title>
        
        {/* <Link href={routes.ADMIN_VERIFY_OTP} className="text-black">verify</Link> */}
        <div
          className="flex flex-1 flex-col justify-center mx-4 px-1 pb-6 sm:px-6 lg:flex-none
        lg:px-20 xl:px-24 w-fit lg:h-fit h-screen shadow-lg rounded-lg bg-slate-100"
        >
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="mt-8  text-2xl font-bold text-center leading-9 tracking-tight">
                Create your account
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500 text-center">
                Already have an account?{" "}
                <Link
                  href={routes.ADMIN_AUTH_LOGIN}
                  className="font-semibold text-primary-600 hover:text-primary-500"
                >
                  Log-in
                </Link>
              </p>
            </div>

            <div className="mt-4">
              <form
                onSubmit={handleSubmit}
                // className="max-w-[300px] flex flex-col justify-center mx-auto"
              >
                <div className="flex gap-4 justify-between">
                <div>
                  <h1 className="font-semibold text-gray-500 mb-4">Users Data</h1>
                  <InputField
                  labelWidth="w-full"
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
                  labelWidth="w-full"
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
                  labelWidth="w-full"
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
                  labelWidth="w-full"
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
                  labelWidth="w-full"
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
                </div>
                {/* ---------user Profile data------------ */}
                <div>
                  <h1 className="font-semibold text-gray-500 mb-4">Users Profile Data</h1>
                  <InputField
                  labelWidth="w-full"
                    name="address"
                    label="Address"
                    id="name"
                    labelClassName="!text-black-100"
                    labelStyle="label-top"
                    type="text"
                    wrapperClassName="flex"
                    value={userFormValues?.address}
                    // fieldErrors={error?.name ?? []}
                    onChange={(e: any) => {
                      handleUserFieldChange("address", e.target.value);
                    }}
                    className="mb-2"
                    required
                  />
                  <InputField
                  labelWidth="w-full"
                    name="phone_number"
                    label="Phone Number"
                    id="name"
                    labelClassName="!text-black-100"
                    labelStyle="label-top"
                    type="text"
                    wrapperClassName="flex"
                    value={userFormValues?.phone_number}
                    // fieldErrors={error?.name ?? []}
                    onChange={(e: any) => {
                      handleUserFieldChange("phone_number", e.target.value);
                    }}
                    className="mb-2"
                  />
                  <InputField
                  labelWidth="w-full"
                    name="date_of_birth"
                    label="Date of Birth"
                    id="name"
                    labelClassName="!text-black-100"
                    labelStyle="label-top"
                    type="date"
                    wrapperClassName="flex"
                    value={userFormValues?.date_of_birth}
                    // fieldErrors={error?.name ?? []}
                    onChange={(e: any) => {
                      handleUserFieldChange("date_of_birth", e.target.value);
                    }}
                    className="mb-2"
                    required
                  />
                  <SelectField
                    className="mb-4"
                    label="Gender"
                    name="gender"
                    labelStyle="label-top"
                    options={stateOptions}
                    // fieldErrors={errors?.is_present ?? []}
                    // defaultValue={parseInt(searchParams?.get("is_present")!)}
                    // value={userFormValues?.gender}
                    value={selectValues?.gender}
                    onChange={(choice: any) =>
                      handleStateChange("is_present", choice)
                    }
                  />
                  <InputField
                    labelWidth="w-full"
                    name="bio"
                    label="Bio"
                    id="name"
                    labelClassName="!text-black-100"
                    labelStyle="label-top"
                    type="text"
                    wrapperClassName="flex"
                    value={userFormValues?.bio}
                    // fieldErrors={error?.name ?? []}
                    onChange={(e: any) => {
                      handleUserFieldChange("bio", e.target.value);
                    }}
                    className="mb-2"
                    required
                  />
                </div>
                </div>
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                ></button>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center"></div>
                </div>

                <div className=" flex items-center justify-center">
                  <Btn
                    // color="light"
                    className="w-1/2 text-black bg-blue-400"
                    type={"submit"}
                    disabled={isLoading}
                  >
                    {isLoading ? <Spinner /> : "Register"}
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
