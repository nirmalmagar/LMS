import React from "react";
import DefaultLayout from "@/components/Layouts/Navbar/DefaultLayout";
import FineTableList from "./_partials/FineTable";

const page = () => {
  return (
    <DefaultLayout>
      <FineTableList showHeading={true} />
    </DefaultLayout>
  );
};

export default page;
