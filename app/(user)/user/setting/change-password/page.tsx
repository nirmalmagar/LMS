"use client"
import React, { FormEvent, useState } from "react";
import DefaultLayout from "@/components/Layouts/UserNavbar/DefaultLayout";
import InputField from "@/components/Form/InputForm";
import Btn from "@/components/Btn";
import { toast } from "react-toastify";
import { accessToken } from "@/helpers/TokenHelper";
import Spinner from "@/components/Spinner/Spinner";

const page = () => {
  const [inputFieldValue, setInputFieldValue] = useState<Record<string, any>>({});
  const [error, setError] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState({
    old_password: false,
    new_password: false,
    confirm_password: false,
  });

  const handleFieldChange = (key: string, value: string): void => {
    if (key && value) {
      setInputFieldValue((prev) => ({ ...prev, [key]: value }));
    }
  };
  
  const handleToggleOldPassword = () => {
    const nowValue = showCurrentPassword['old_password']
    setShowCurrentPassword((prev) => ({...prev , ['old_password'] : !nowValue}))
}
  const handleToggleNewPassword = () => {
    const nowValue = showCurrentPassword["new_password"];
    setShowCurrentPassword((prev) => ({...prev, ["new_password"]: !nowValue,}));
  };
  const handleToggleConfirmPassword = () => {
    const nowValue = showCurrentPassword["confirm_password"];
    setShowCurrentPassword((prev) => ({...prev,["confirm_password"]: !nowValue,}));
  };

  const handleChangePassword = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      const InputFileData = {
        old_password: inputFieldValue?.old_password,
        new_password: inputFieldValue?.new_password,
        confirm_password: inputFieldValue?.confirm_password,
      };
      try {
        const response = await fetch(`${process.env.HOST}account/password/change/`, {
          method: "POST",
          body: JSON.stringify(InputFileData),
          headers: {
            Authorization: `Bearer ${accessToken()}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          toast.success("change password successfully");
          setInputFieldValue({})
        } else {
          setError(data);
        }
      } catch (error) {
        console.error(error);
      }
      finally {
        setIsLoading(false);
    }
    };

  return (
    <DefaultLayout>
      <h3 className="font-medium leading-normal text-xl text-black dark:text-white mt-6">
          Change Your Password
        </h3>
      <form onSubmit={handleChangePassword} className="mt-8">
        <div className="w-full max-w-[235px] mb-6">
        <InputField
          type={showCurrentPassword.old_password ? "text" : "password"}
          label="Old Password"
          name="old_password"
          labelStyle="label-top"
          labelWidth={"full"}
          required
          defaultValue={inputFieldValue?.old_password}
          fieldErrors={error?.old_password}
          onChange={(e: any) =>
            handleFieldChange("old_password", e.target.value)
          }
          passwordField={true}
          showPassword={showCurrentPassword.old_password}
          togglePasswordVisibility={handleToggleOldPassword}
        />
        </div>
        <div className="flex md:flex-row flex-col gap-6">
        <InputField
          label="New Password"
          type={showCurrentPassword.new_password ? "text" : "password"}
          name="new_password"
          labelStyle="label-top"
          labelWidth={"full"}
          className="w-full min-w-[235px]"
          required
          defaultValue={inputFieldValue?.new_password}
          fieldErrors={error?.new_password}
          onChange={(e: any) =>
            handleFieldChange("new_password", e.target.value)
          }
          passwordField={true}
          showPassword={showCurrentPassword.new_password}
          togglePasswordVisibility={handleToggleNewPassword}
        />
        <InputField
          label="Confirm Password"
          type={showCurrentPassword.confirm_password ? "text" : "password"}
          name="confirm_password"
          labelStyle="label-top"
          labelWidth={"full"}
          className="w-full min-w-[235px]"
          required
          defaultValue={inputFieldValue?.confirm_password}
          fieldErrors={error?.confirm_password}
          onChange={(e: any) =>
            handleFieldChange("confirm_password", e.target.value)
          }
          passwordField={true}
          showPassword={showCurrentPassword.confirm_password}
          togglePasswordVisibility={handleToggleConfirmPassword}
        />
        </div>
        <div className="mt-8">
            <Btn type="submit" className="w-40" disabled={isLoading}>
              {isLoading ? <Spinner /> : "Change Password"}
            </Btn>
          </div>
        {/* <div className="flex gap-x-4">
          <Btn type="submit" className="bg-blue-600 text-white">
            Submit
          </Btn>
        </div> */}
      </form>
    </DefaultLayout>
  );
};

export default page;
