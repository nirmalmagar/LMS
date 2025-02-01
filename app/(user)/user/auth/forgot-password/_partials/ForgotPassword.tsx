"use client"
import Btn from "@/components/Btn";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import routes from "@/utils/userRoutes";
import Spinner from "@/components/Spinner/Spinner";
import { accessToken } from "@/helpers/TokenHelper";

const ForgotPassword = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputFormValue, setInputFormValue] = useState({
    email: "",
  });

  const ForgotPasswordURL = `${process.env.HOST}account/password/email/`;
  const changeHandler = (key: string, value: string): void => {
    setInputFormValue((inputValue) => ({ ...inputValue, [key]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    const ForgotPasswordData = {
      email: inputFormValue.email,
    };
    try {
      const response = await fetch(ForgotPasswordURL, {
        method: "POST",
        body: JSON.stringify(ForgotPasswordData),
        headers: {
          // Authorization: `Bearer ${accessToken()}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (response.ok) {
        router.push(routes.RESET_PASSWORD);
        toast.success(result?.message || result?.email);
      } else {
        toast.error(result?.message || result?.email);
      }
    } catch (error) {
      console.log(error);
      toast.error(" connect fail");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-200 h-screen">
      <div className={` px-8 py-8 bg-white w-[30rem] shadow-md rounded-xl`}>
        <div className="text-lg mb-2 font-semibold text-center">
          <span>Forgot Password</span>
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
              placeholder="enter your email"
              value={inputFormValue?.email}
              onChange={(e: any) => changeHandler("email", e.target.value)}
              required
            />
          </div>
          <div className="mt-4 flex items-center justify-center">
            <Btn
              className="w-1/2 bg-blue-400"
              type={"submit"}
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : "Confirm"}
            </Btn>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
