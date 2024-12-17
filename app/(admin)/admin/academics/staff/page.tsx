import React from "react";
import DefaultLayout from "@/components/Layouts/Navbar/DefaultLayout";
import StaffTableList from "./_partials/StaffTableList";

const page = () => {
  return (
    <DefaultLayout>
      <StaffTableList showHeading={true} />
    </DefaultLayout>
  );
};

export default page;
