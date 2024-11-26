"use client";
import React from "react";
import DefaultLayout from "@/components/Layouts/Navbar/DefaultLayout";
import UsersBooksTable from "../dashboard/_partials/UsersBooksTable";

const BookPage = () => {
  return (
    <DefaultLayout>
      <UsersBooksTable showHeading={true} showMore={true} />
    </DefaultLayout>
  );
};

export default BookPage;


