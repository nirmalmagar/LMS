import React from "react";
import OtpPage from "./_partials/OtpPage";

const page = () => {
  return (
    <>
      <h1 className="bg-green-400 text-center text-white py-5 text-lg">OPT Code has been sent to your email successfully !</h1>
      <div className="mt-28">
      <OtpPage />
      </div>
    </>
  );
};

export default page;
