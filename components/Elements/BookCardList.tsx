"use client";
import React, { useEffect, useState } from "react";
import Container from "../Container";
import Image from "next/image";
import Heading from "../HomePages/Heading";
import useSWR from "swr";
import { getFetcher } from "@/helpers/FetchHelper";
import Link from "next/link";

const BookCardList = () => {
  const { data: BookListsURL, isLoading: loading } = useSWR(
    `${process.env.HOST}books/`,
    getFetcher
  );

  return (
    <>
      <Container>
        <Heading children={"Explore Fresh Arrivals and Find Your Next Great Read."} title={"New Arrivals"} />
        <section className="my-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-items-center gap-y-12 gap-x-12">
            {BookListsURL?.results?.map((value: any, index: number) => {
              return (
                <div key={index}>
                  <div className="shadow-md hover:shadow-xl hover:scale-105  hover:duration-500">
                    <Link href={`/book-list/${value.id}`}>
                      <div className="relative w-60 h-72 mb-2">
                        <Image
                          fill
                          src={value?.cover}
                          alt="cover image"
                        />
                      </div>
                      <div className=" pl-4 pb-2">
                        <h3 className="font-semibold">{value?.title}</h3>
                        <div className="flex gap-x-0.5">
                          <span className="font-semibold">by:</span>
                          <p>{value?.publisher}</p>
                        </div>
                        <div className="flex gap-x-0.5 font-semibold text-lg">
                          <p className="">Rs:</p>
                          <span>{value?.price}</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                  {/* <div className="my-2 py-1 border-2 border-blue-400 text-center rounded-sm hover:bg-blue-400 font-semibold hover:text-white">
                    ADD TO CART
                  </div> */}
                </div>
              );
            })}
          </div>
          {BookListsURL && (
            <button className="w-full text-center mt-4 text-md">
              View All
            </button>
          )}
        </section>
        {loading && <div className="text-center text-xl h-96">Loading.....</div>}
      </Container>
    </>
  );
};

export default BookCardList;
