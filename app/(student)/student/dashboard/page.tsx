import React from "react";
import DefaultLayout from "@/components/Layouts/StudentNavbar/DefaultLayout";
import WelcomeBanner from "./_partials/WelcomeBanner";
const page = () => {
  return (
    <div>
      <DefaultLayout>
        <WelcomeBanner />
      </DefaultLayout>
    </div>
  );
};
export default page;
