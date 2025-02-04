"use client"
import React, { FormEvent, useState } from "react";
import InputField from "@/components/Form/InputForm";
import Btn from "@/components/Btn";
import { toast } from "react-toastify";
import { accessToken } from "@/helpers/TokenHelper";
import Spinner from "@/components/Spinner/Spinner";

const ResetPassword = () => {
  const [inputFieldValue, setInputFieldValue] = useState<Record<string, any>>({});
  const [error, setError] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState({
    otp: false,
    new_password: false,
    confirm_password: false,
  });

  const handleFieldChange = (key: string, value: string): void => {
    if (key && value) {
      setInputFieldValue((prev) => ({ ...prev, [key]: value }));
    }
  };
  
  const handleToggleOldPassword = () => {
    const nowValue = showCurrentPassword['otp']
    setShowCurrentPassword((prev) => ({...prev , ['otp'] : !nowValue}))
}
  const handleToggleNewPassword = () => {
    const nowValue = showCurrentPassword["new_password"];
    setShowCurrentPassword((prev) => ({...prev, ["new_password"]: !nowValue,}));
  };
  const handleToggleConfirmPassword = () => {
    const nowValue = showCurrentPassword["confirm_password"];
    setShowCurrentPassword((prev) => ({...prev,["confirm_password"]: !nowValue,}));
  };

  const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      const InputFileData = {
        otp: inputFieldValue?.otp,
        new_password: inputFieldValue?.new_password,
        confirm_password: inputFieldValue?.confirm_password,
      };
      try {
        const response = await fetch(`${process.env.HOST}account/password/reset/`, {
          method: "POST",
          body: JSON.stringify(InputFileData),
          headers: {
            // Authorization: `Bearer ${accessToken()}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          setInputFieldValue({})
          setError({});
          toast.success("Reset password successfully");
        } else {
          toast.error("some error occure");
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
    <>
      <div className="flex justify-center items-center mt-20 ">
      <div className={` px-8 py-8 bg-white w-[36rem] shadow-md rounded-xl`}>
      <h3 className="font-medium leading-normal text-xl text-black dark:text-white mt-6">
          Reset Password
        </h3>
      <form onSubmit={handleResetPassword} className="mt-8">
        <div className="w-full max-w-[235px] mb-6">
        <InputField
          type={showCurrentPassword.otp ? "text" : "password"}
          label="OTP"
          name="otp"
          labelStyle="label-top"
          labelWidth={"full"}
          required
          defaultValue={inputFieldValue?.otp}
          fieldErrors={error?.otp}
          onChange={(e: any) =>
            handleFieldChange("otp", e.target.value)
          }
          passwordField={true}
          showPassword={showCurrentPassword.otp}
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
    </div>
    </div>
    </>
  );
};

export default ResetPassword;
