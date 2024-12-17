import React from "react";
import DefaultLayout from "@/components/Layouts/Navbar/DefaultLayout";
import TeacherTableList from "./_partials/TeacherTableLists";

const page = () => {
  return (
    <DefaultLayout>
      <TeacherTableList showHeading={true} />
    </DefaultLayout>
  );
};

export default page;
