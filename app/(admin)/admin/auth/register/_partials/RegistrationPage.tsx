"use client";
import React, { useState } from "react";
import InputField from "@/components/Form/InputForm";
import { Lora } from "next/font/google";
import Btn from "@/components/Btn";
import { routes } from "@/utils/routes";
import Link from "next/link";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400"],
});

const RegistrationPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const registerUrl = {{main_url}}register/
  const handleSubmitRegistration = () => {
    return (
      <>
        <div>register name</div>
      </>
    );
  };

  return (
    <div
      className={`flex flex-col justify-center items-center bg-gray-200 h-screen ${lora.className}`}
    >
      <div className="px-8 py-8 bg-white w-[30rem] shadow-md rounded-xl">
        <h1 className="text-center font-semibold my-2 text-xl">
          Create your account
        </h1>
        <div className="text-center mb-6 text-sm">
          Already have an account ?{" "}
          <Link
            href={routes.ADMIN_AUTH_LOGIN}
            className="text-blue-500 text-sm"
          >
            login
          </Link>
        </div>
        <form
          onSubmit={handleSubmitRegistration}
          className="flex flex-col gap-4"
        >
          <InputField
            label="First Name"
            name="first_name"
            type="text"
            placeholder="enter your first name"
          />
          <InputField
            label="Middle Name"
            name="middle_name"
            type="text"
            placeholder="enter your middle name"
          />
          <InputField
            label="Last Name"
            name="last_name"
            type="text"
            placeholder="enter your last name"
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            autocomplete={false}
            placeholder="enter your email"
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="enter password"
          />
            <Btn
              className="bg-blue-400 mt-4"
              type={"submit"}
              disabled={isLoading}
            >
              Register
            </Btn>
        </form>
      </div>
    </div>
  );
};
export default RegistrationPage;
