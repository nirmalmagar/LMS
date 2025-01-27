"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { Lora } from "next/font/google";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Spinner from "@/components/Spinner/Spinner";
import Btn from "@/components/Btn";
import { usePathname, useRouter } from "next/navigation";
import routes from "@/utils/userRoutes";
import Cookie from "js-cookie";
import { toast } from "react-toastify";
import { accessToken } from "@/helpers/TokenHelper";
import DefaultLayout from "@/components/Layouts/UserNavbar/DefaultLayout";

const lora = Lora({ subsets: ["latin"], weight: ["400"] });

const page: React.FC = () => {
  const router = useRouter();
  const user_id = Cookie.get("USER_ID");

  const pathname = usePathname();
  const [hidePassword, setHidePassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputFormValue, setInputFormValue] = useState({
    new_password: "",
  });

  const LoginURL = `${process.env.HOST}user/${user_id}/change-password/`;
  const changeHandler = (key: string, value: string): void => {
    setInputFormValue((inputValue) => ({ ...inputValue, [key]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    const LoginData = {
      new_password: inputFormValue.new_password,
    };
    try {
      const response = await fetch(LoginURL, {
        method: "POST",
        body: JSON.stringify(LoginData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(" user login successfully");
      } else {
        toast.error("something went wrong!!");
      }
    } catch (error) {
      console.log(error);
      toast.error(" connect fail");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <div
        className={`${lora.className} ${
          pathname === "/user/auth/login"
            ? "flex justify-center items-center bg-gray-200 h-screen"
            : "ml-8"
        }`}
      >
        <div className="text-lg mb-2 font-semibold">
          <span>Change Password</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mt-4 relative">
            <label className=" mb-2 mr-4" htmlFor="new_password">
              New Password
            </label>
            <div className="w-1/3">
              <input
                className="text-lg border-[1.5px] rounded-md shadow-sm border-gray-300 py-1.5 pl-2 pr-12 focus:outline-none"
                id="password"
                name="password"
                type={`${hidePassword ? "text" : "password"}`}
                value={inputFormValue?.new_password}
                onChange={(e: any) => {
                  changeHandler("new_password", e.target.value);
                }}
              />
              <div
                className="w-4 h-4 absolute cursor-pointer top-[46px] left-[14rem]"
                onClick={() => setHidePassword(!hidePassword)}
              >
                {hidePassword ? <EyeIcon /> : <EyeSlashIcon />}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Btn
              className="w-40 bg-blue-400"
              type={"submit"}
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : "change password"}
            </Btn>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default page;
