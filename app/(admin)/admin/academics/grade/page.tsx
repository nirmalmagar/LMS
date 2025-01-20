"use client"
import React, { useEffect } from "react";
import DefaultLayout from "@/components/Layouts/Navbar/DefaultLayout";
import GradeTableList from "./_partials/GradeTableList";
import useSWR from "swr";
import { defaultFetcher } from "@/helpers/FetchHelper";

const page = () => {
  // `${process.env.HOST}grades?page=${currentPage}`
  const {
    data: gradeList,
    isLoading,
    mutate,
  } = useSWR(`${process.env.HOST}grades/`, defaultFetcher);
  
  useEffect(()=>{
    mutate();
  },[mutate])
  return (
    <DefaultLayout>
      {isLoading ? (
        <p className="text-xl bg-white h-96 flex items-center justify-center mt-8 rounded-2xl">
          <span>Loading...</span>
        </p>
      ) : (
          <GradeTableList showHeading={true} data={gradeList} mutate={mutate} />
      )}
    </DefaultLayout>
  );
};

export default page;
