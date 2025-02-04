import React from "react";
import ResetPassword from "./_partials/ResetPassword";

const page = () => {
  return (
    <>
      <h1 className="bg-green-400 text-center text-white py-5 text-lg">
        OPT Code has been sent to your email successfully !
      </h1>
      <div>
        <ResetPassword />
      </div>
    </>
  );
};

export default page;
