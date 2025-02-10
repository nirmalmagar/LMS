"use client";
import React from "react";
import DefaultLayout from "@/components/Layouts/Navbar/DefaultLayout";
import StudentTableList from "./StudentTableList";
import useSWR from "swr";
import { defaultFetcher } from "@/helpers/FetchHelper";

const StudentPage = () => {
  // `${process.env.HOST}students/?page=${currentPage}`
  const {
    data: studentData,
    isLoading,
    mutate,
  } = useSWR(`${process.env.HOST}students/`, defaultFetcher);
  return (
    <DefaultLayout>
      {isLoading ? (
        <p className="text-xl bg-white h-96 flex items-center justify-center mt-8 rounded-2xl">
          <span>Loading...</span>
        </p>
      ) : (
        <StudentTableList
          showHeading={true}
          studentData={studentData}
          mutate={mutate}
        />
      )}
    </DefaultLayout>
  );
};

export default StudentPage;
