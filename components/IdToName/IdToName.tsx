import { defaultFetcher } from "@/helpers/FetchHelper";
import React from "react";
import useSWR from "swr";

interface IdProps{
  Id:number
}
export const UserId:React.FC<IdProps> = ({Id}) => {
    const {data: userData} = useSWR(`${process.env.HOST}user/`, defaultFetcher);
    const userName = userData?.results?.find((userList:any)=> userList?.id === Id);
    
  return userName?.name

};

export const LibraryId:React.FC<IdProps> = ({Id}) => {
  const {data: libraryData} = useSWR(`${process.env.HOST}library-sections/`, defaultFetcher);
  const libraryName = libraryData?.results?.find((libraryList:any)=> libraryList?.id === Id);
  
return libraryName?.name

};

export const GradeId:React.FC<IdProps> = ({Id}) => {
  const {data: gradeData} = useSWR(`${process.env.HOST}grades/`, defaultFetcher);
  const gradeName = gradeData?.results?.find((gradeList:any)=> gradeList?.id === Id);
  
return gradeName?.name

};

export const DepartmentId:React.FC<IdProps> = ({Id}) => {
  const {data: departmentData} = useSWR(`${process.env.HOST}departments/`, defaultFetcher);
  const departmentName = departmentData?.results?.find((departmentList:any)=> departmentList?.id === Id);
  
return departmentName?.name

};

