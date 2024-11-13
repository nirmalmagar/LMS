"use client";
import React from "react";
import { useParams } from "next/navigation";
import useSWR from "swr";
import Image from "next/image";
import { defaultFetcher } from "@/helpers/FetchHelper";
import Container from "@/components/Container";
import OtherInfo from "@/components/Elements/OtherInfo/OtherInfo";
import HomeLayout from "@/components/Layouts/HomeNavBar/HomeLayout";

const page = () => {
  const { book_id } = useParams();
  const { data: bookId } = useSWR(
    `${process.env.HOST}books/${book_id}`,
    defaultFetcher
  );
  return (
    <>
      <HomeLayout>
        <Container>
          <div className="grid xl:grid-cols-4">
            <div>
              <div className="relative h-[20rem] w-[16rem]">
                <Image
                  alt="student_image"
                  src={bookId?.cover}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="col-span-2">
              <span className="bg-gray-300 rounded-md px-2 py-0.5">Paper Back</span>
              <h1>{bookId?.title}</h1>
              <span>by: {bookId?.author}</span>
              <h2>Sold By: Gyan Kosh Nepal</h2>
              <div>
                <h3>Synopsis</h3>
                <p>{bookId?.description}</p>
              </div>
              <div>
                <p>Other Info</p>
                <OtherInfo/>
              </div>
            </div>
            <div></div>
          </div>
        </Container>
      </HomeLayout>
    </>
  );
};

export default page;
