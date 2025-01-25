import React from "react";
import DefaultLayout from "@/components/Layouts/StudentNavbar/DefaultLayout";
import BorrowHistory from "./_partials/BorrowHistory";

const page = () => {
  return (
    <DefaultLayout>
      <BorrowHistory />
    </DefaultLayout>
  );
};

export default page;
