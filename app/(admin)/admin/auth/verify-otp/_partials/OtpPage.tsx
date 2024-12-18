"use client"
import React from "react";
import VerifyOtp from "@/components/Elements/Authentication/VerifyOtp";

const OtpPage = () => {
  return (
    <div>
      <h1 className="bg-green-400 text-center text-white py-5 text-lg">OPT Code has been sent to your email successfully !</h1>
      <div className="mt-28">
      <VerifyOtp
        
      />
      </div>
    </div>
    )
};

export default OtpPage;
