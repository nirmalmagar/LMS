"use client";
import React from "react";
import DefaultLayout from "@/components/Layouts/Navbar/DefaultLayout";
import DepartmentTableList from "./_partials/DepartmentTableList";
import useSWR from "swr";
import { defaultFetcher } from "@/helpers/FetchHelper";

const page = () => {
  // `${process.env.HOST}departments?page=${currentPage}`
  const {
    data: departmentList,
    isLoading,
    mutate,
  } = useSWR(`${process.env.HOST}departments/`, defaultFetcher);
  
  return (
    <DefaultLayout>
      {isLoading ? (
        <p className="text-xl bg-white h-96 flex items-center justify-center mt-8 rounded-2xl">
          <span>Loading...</span>
        </p>
      ) : (
        <DepartmentTableList
          showHeading={true}
          data={departmentList}
          mutate={mutate}
        />
      )}
    </DefaultLayout>
  );
};

export default page;
