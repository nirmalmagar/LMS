import React from "react";
import DefaultLayout from "@/components/Layouts/Navbar/DefaultLayout";
import DepartmentTableList from "./_partials/DepartmentTableList";

const page = () => {
  return <DefaultLayout>
    <DepartmentTableList showHeading={true}/>
  </DefaultLayout>;
};

export default page;
