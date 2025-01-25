"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { Lora } from "next/font/google";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Spinner from "@/components/Spinner/Spinner";
import Btn from "@/components/Btn";
import { usePathname, useRouter } from "next/navigation";
import routes from "@/utils/studentRoutes";
import Cookie from "js-cookie";
import { toast } from "react-toastify";
import Link from "next/link";
import InputField from "@/components/Form/InputForm";
import DefaultLayout from "@/components/Layouts/StudentNavbar/DefaultLayout";
import { accessToken } from "@/helpers/TokenHelper";
const lora = Lora({ subsets: ["latin"], weight: ["400"] });

const page: React.FC = () => {
  const [errors, setErrors] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [inputFieldValues, setInputFieldValues] = useState<Record<any, any>>({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState({
    old_password: false,
    new_password: false,
    confirm_password: false,
  });

  const handleToggleCurrentPassword = () => {
    const nowValue = showCurrentPassword['old_password']
    setShowCurrentPassword((prev) => ({...prev , ['old_password'] : !nowValue}))
}

  const handleToggleNewPassword = () => {
    const nowValue = showCurrentPassword["new_password"];
    setShowCurrentPassword((prev) => ({...prev, ["new_password"]: !nowValue,}));
  };

  const handleToggleConfirmNewPassword = () => {
    const nowValue = showCurrentPassword["confirm_password"];
    setShowCurrentPassword((prev) => ({...prev,["confirm_password"]: !nowValue,}));
  };
  
  const handleInputValueChange = (name: string, value: string): void => {
    setInputFieldValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
        setErrors({})
        setIsLoading(true);
        const senDATA = {
            old_password: inputFieldValues.old_password,
            new_password: inputFieldValues.new_password,
            confirm_password: inputFieldValues.confirm_password,
        };

        try {
            const data = await fetch(`${process.env.HOST}account/password/change/`, {
                method: "POST",
                body: JSON.stringify(senDATA),
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const response = await data.json();
            console.log("data", data);
            if (data.ok) {
                toast.success(response.message);
                setInputFieldValues({
                    old_password: "",
                    new_password: "",
                    confirm_password: "",
                });
            } else {
              toast.error("soem thism is wrong");
                toast.error(response?.message);
                setErrors(response || response);
            }
        } catch (e) {
        } finally {
            setIsLoading(false);
        }
  };

  return (
    <DefaultLayout>
      <div className="px-5">
        <h3 className="font-medium leading-normal text-xl text-black dark:text-white mt-6">
          Change Your Password
        </h3>
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="w-full max-w-[235px] mb-6">
            <InputField
              name="old_password"
              type={showCurrentPassword.old_password ? "text" : "password"}
              label="Current Password"
              labelStyle="label-top"
              labelWidth={"full"}
              required
              fieldErrors={errors?.old_password}
              value={inputFieldValues.old_password}
              passwordField={true}
              showPassword={showCurrentPassword.old_password}
              togglePasswordVisibility={handleToggleCurrentPassword}
              onChange={(e: any) =>
                handleInputValueChange("old_password", e.target.value)
              }
            />
          </div>
          <div className="flex md:flex-row flex-col gap-6">
            <InputField
              name="new_password"
              type={showCurrentPassword.new_password ? "text" : "password"}
              label="New Password"
              labelStyle="label-top"
              labelWidth={"full"}
              className="w-full min-w-[235px]"
              required
              fieldErrors={errors?.new_password}
              value={inputFieldValues.new_password}
              onChange={(e: any) =>
                handleInputValueChange("new_password", e.target.value)
              }
              passwordField
              showPassword={showCurrentPassword.new_password}
              togglePasswordVisibility={handleToggleNewPassword}
            />
            <InputField
              name="confirm_password"
              type={
                showCurrentPassword.confirm_password
                  ? "text"
                  : "password"
              }
              label="Confirm Password"
              labelStyle="label-top"
              labelWidth={"full"}
              required
              className="w-full min-w-[235px]"
              fieldErrors={errors?.confirm_password}
              value={inputFieldValues.confirm_password}
              onChange={(e: any) =>
                handleInputValueChange(
                  "confirm_password",
                  e.target.value
                )
              }
              passwordField
              showPassword={showCurrentPassword.confirm_password}
              togglePasswordVisibility={handleToggleConfirmNewPassword}
            />
          </div>
          <div className="mt-8">
            <Btn type="submit" disabled={isLoading}>
              {isLoading ? <Spinner /> : "Change Password"}
            </Btn>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default page;
