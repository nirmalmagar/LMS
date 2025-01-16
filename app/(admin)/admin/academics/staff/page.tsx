"use client";
import React from "react";
import DefaultLayout from "@/components/Layouts/Navbar/DefaultLayout";
import StaffTableList from "./_partials/StaffTableList";
import useSWR from "swr";
import { defaultFetcher } from "@/helpers/FetchHelper";

const page = () => {
  // `${process.env.HOST}staffs/?page=${currentPage}`
  const staffURL =  `${process.env.HOST}staffs/`
  // const staffURL = `${process.env.HOST}staffs/`;
  const {
    data: staffList,
    isLoading,
    mutate,
  } = useSWR(staffURL, defaultFetcher);

  return (
    <DefaultLayout>
      {isLoading ? (
        <p className="text-xl bg-white h-96 flex items-center justify-center mt-8 rounded-2xl">
          <span>Loading...</span>
        </p>
      ) : (
        <div>
          <StaffTableList showHeading={true} data={staffList} mutate={mutate} />
        </div>
      )}
    </DefaultLayout>
  );
};

export default page;
