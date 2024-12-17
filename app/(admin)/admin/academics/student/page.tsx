import React from "react";
import DefaultLayout from "@/components/Layouts/Navbar/DefaultLayout";
import StudentTableList from "./_partials/StudentTableList";

const page = () => {
  return (
    <DefaultLayout>
      <StudentTableList showHeading={true} />
    </DefaultLayout>
  );
};

export default page;
