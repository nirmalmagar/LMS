import React from "react";
import DefaultLayout from "@/components/Layouts/Navbar/DefaultLayout";
import GradeTableList from "./_partials/GradeTableList";

const page = () => {
  return (
    <DefaultLayout>
      <GradeTableList showHeading={true} />
    </DefaultLayout>
  );
};

export default page;
