import React from "react";
import DefaultLayout from "@/components/Layouts/Navbar/DefaultLayout";
import BorrowTableList from "./_partials/BorrowTableList";

const BorrowPage = () => {
  return (
    <DefaultLayout>
      <BorrowTableList showHeading={true} />
    </DefaultLayout>
  );
};

export default BorrowPage;
