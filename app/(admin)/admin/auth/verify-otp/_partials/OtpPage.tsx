"use client"
import React from "react";
import VerifyOtp from "@/components/Elements/Authentication/VerifyOtp";
// import OtpVerify from "@/components/Elements/Authentication/OptVerify";
import { useSearchParams } from "next/navigation";

const OtpPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('email');
  return (
    <div>
      <h1 className="bg-green-400 text-center text-white py-5 text-lg">OPT Code has been sent to your email successfully !</h1>
      <div className="mt-28">
      <VerifyOtp/>
      {/* <OtpVerify  url={`${process.env.HOST}verify-email/?email=${query}`} isStudent={false}/> */}
      </div>
    </div>
    )
};

export default OtpPage;
