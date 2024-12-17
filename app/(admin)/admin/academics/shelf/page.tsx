import React from "react";
import DefaultLayout from "@/components/Layouts/Navbar/DefaultLayout";
import ShelvesTableList from "./_partials/ShelfTableList";

const page = () => {
  return (
    <DefaultLayout>
      <ShelvesTableList showHeading={true} />
    </DefaultLayout>
  );
};

export default page;
