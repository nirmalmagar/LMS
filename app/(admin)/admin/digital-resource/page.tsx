import React from "react";
import DefaultLayout from "@/components/Layouts/Navbar/DefaultLayout";
import DigitalResourcesList from "./_partial/DigitalResourceLists";

const page = () => {
  return (
    <DefaultLayout>
      <DigitalResourcesList showHeading={true} showMore={true} />
    </DefaultLayout>
  );
};

export default page;
