import React from "react";
import DefaultLayout from "@/components/Layouts/Navbar/DefaultLayout";
import LibraryTableList from "./_partials/LibraryTableList";

const page = () => {
  return <DefaultLayout>
      <LibraryTableList showHeading={true}/>
  </DefaultLayout>;
};

export default page;
