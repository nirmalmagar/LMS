"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { Lora } from "next/font/google";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Spinner from "@/components/Spinner/Spinner";
import Btn from "@/components/Btn";
import { useRouter } from "next/navigation";
import { routes } from "@/utils/routes";
import Cookie from "js-cookie";
import { toast } from "react-toastify";

const lora = Lora({ subsets: ["latin"], weight: ["400"] });

const LoginPage: React.FC = () => {
  const route = useRouter();
  const [hidePassword, setHidePassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputFormValue, setInputFormValue] = useState<Record<string, string>>(
    {}
  );

  const LoginURL = `${process.env.HOST}token/`;

  const changeHandler = (key: string, value: string): void => {
    setInputFormValue((inputValue) => ({ ...inputValue, [key]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    const LoginData = {
      email: inputFormValue?.email,
      password: inputFormValue?.password,
    };
    try {
      const response = await fetch(LoginURL, {
        method: "POST",
        body: JSON.stringify(LoginData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (response.ok) {
        const data = result;
        Cookie.set("LOGIN_TOKEN", data?.token?.access);
        route.push(routes.ADMIN_DASHBOARD_ROUTE);
        toast.success("login successfully")
      }
      else{
        toast.error("something went wrong!!")
        Cookie.remove("LOGIN_TOKEN")
      }
    } catch (error) {
      console.log(error);
      toast.error(" connect fail")
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (Cookie.get("LOGIN_TOKEN")) {
      route.push(routes.ADMIN_DASHBOARD_ROUTE);
    }
  }, []);
  return (
    <div
      className={`flex justify-center items-center bg-gray-200 h-screen ${lora.className}`}
    >
      <div className="px-8 py-8 bg-white w-[30rem] shadow-md rounded-xl">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold mr-4" htmlFor="email">
              Email:
            </label>
            <input
              className="text-lg border-[1.5px] rounded-md shadow-sm border-gray-300 py-1.5 px-2 focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              value={inputFormValue?.email}
              onChange={(e: any) => changeHandler("email", e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col mt-4 relative">
            <label className=" mb-2 font-semibold mr-4" htmlFor="password">
              Password
            </label>
            <input
              className="text-lg border-[1.5px] rounded-md shadow-sm border-gray-300 py-1.5 pl-2 pr-12 focus:outline-none"
              id="password"
              name="password"
              type={`${hidePassword ? "text" : "password"}`}
              value={inputFormValue?.password}
              onChange={(e: any) => {
                changeHandler("password", e.target.value);
              }}
            />
            <div
              className="w-4 h-4 absolute cursor-pointer top-[46px] right-4"
              onClick={() => setHidePassword(!hidePassword)}
            >
              {hidePassword ? <EyeIcon /> : <EyeSlashIcon />}
            </div>
            <div className="mt-4 flex items-center justify-center">
              <Btn
                className="w-1/2 bg-blue-400"
                type={"submit"}
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : "Login"}
              </Btn>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
