import React from "react";
import DefaultLayout from "@/components/Layouts/Navbar/DefaultLayout";
import UsersListTable from "./_partials/UsersListTable";

const page = () => {
  return (
    <>
      <DefaultLayout>
        <UsersListTable />
      </DefaultLayout>
    </>
  );
};

export default page;
