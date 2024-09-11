"use client";
import React, { useState } from "react";
import { Lora } from "next/font/google";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Spinner from "@/components/Spinner/Spinner";
import Btn from "@/components/Btn";

// interface LoginPageProps {
//   email: string;
//   password: string;
// }

const lora = Lora({ subsets: ["latin"], weight: ["400"] });

const LoginPage: React.FC = () => {
  const [hidePassword, setHidePassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit=()=>{

  }

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
              value={}
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
            />
            <div
              className="w-4 h-4 absolute cursor-pointer top-[46px] right-4"
              onClick={() => setHidePassword(!hidePassword)}
            >
              {hidePassword ? <EyeIcon /> : <EyeSlashIcon />}
            </div>
            {/* <button className="bg-blue-500 mt-6 font-semibold text-white text-md tracking-wider py-2 rounded-md">
              {<Spinner className="text-center" />}
            </button> */}
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
