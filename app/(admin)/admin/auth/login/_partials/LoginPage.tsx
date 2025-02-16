"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { Lora } from "next/font/google";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Spinner from "@/components/Spinner/Spinner";
import Btn from "@/components/Btn";
import { usePathname, useRouter } from "next/navigation";
import { routes } from "@/utils/routes";
import Cookie from "js-cookie";
import { toast } from "react-toastify";
import Link from "next/link";

const lora = Lora({ subsets: ["latin"], weight: ["400"] });

const LoginPage: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [hidePassword, setHidePassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputFormValue, setInputFormValue] = useState({
    email: "",
    password: "",
  });

  const LoginURL = `${process.env.HOST}token/`;
  const changeHandler = (key: string, value: string): void => {
    setInputFormValue((inputValue) => ({ ...inputValue, [key]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    const LoginData = {
      email: inputFormValue.email,
      password: inputFormValue.password,
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
        Cookie.set("GROUP_NAME",data?.user?.groups[0]?.name)
        Cookie.set("ADMIN_LOGIN_ID",data?.user?.id)
        router.replace(routes.ADMIN_DASHBOARD_ROUTE);
        toast.success("login successfully");
      } else {
        toast.error("something went wrong!!");
        Cookie.remove("LOGIN_TOKEN");
        Cookie.remove("GROUP_NAME")
        Cookie.remove("ADMIN_LOGIN_ID")
      }
    } catch (error) {
      console.log(error);
      toast.error(" connect fail");
    } finally {
      setIsLoading(false);
    }
  };

  const token = Cookie.get("LOGIN_TOKEN");
  useEffect(() => {
    if (typeof window !== "undefined" && token) {
      router.push(routes.ADMIN_DASHBOARD_ROUTE);
    }
  }, [router,token]);

  return (
    <div
      className={`${lora.className} ${
        pathname === "/admin/auth/login"
          ? "flex justify-center items-center bg-gray-200 h-screen"
          : "ml-8"
      }`}
    >
      <div className={` px-8 py-8 bg-white w-[30rem] shadow-md rounded-xl`}>
        <div className="text-lg mb-2 font-semibold text-center">
          <span>Login your Account</span>
        </div>
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
          <div className="text-sm tex-md mt-4">
            Not a member ?{" "}
            <Link href={routes.ADMIN_AUTH_SIGN_UP} className="text-blue-500">
              Create an Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
