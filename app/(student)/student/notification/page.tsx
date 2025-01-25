import React from "react";
import Notification from "./_partials/Notification";
import DefaultLayout from "@/components/Layouts/StudentNavbar/DefaultLayout";
const page = () => {
  return (
    <DefaultLayout>
      <Notification />
    </DefaultLayout>
  );
};

export default page;
