"use client"
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import AffordableBookCard from "@/components/HomePages/AffordableBookCard";
import HomeLayout from "@/components/Layouts/HomeNavBar/HomeLayout";
import BookCardList from "./book-list/_partials/BookCardList";
import { getFetcher } from "@/helpers/FetchHelper";
import useSWR from "swr";

const page = () => {
  // const affordableBooksList = [
  //   "/assets/books/image.png",
  //   "/assets/books/image2.png",
  //   "/assets/books/image3.png",
  //   "/assets/books/image4.png",
  //   "/assets/books/image5.png",
  // ];
  const [searchValue, setSearchValue] = useState("");
  const { data: BookListsURL, isLoading: loading } = useSWR(
    `${process.env.HOST}books/?query=${searchValue}`,
    getFetcher
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }
  
  // const SearchHandler = (e:any) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.target);
  //   const getQuery = formData.get("query");
  //   // route.push(`/photos?query=${getQuery}`)
  // };
  return (
    <>
      <HomeLayout>
        <div id="home">
          {/* -------------------Hero page------------------------ */}
          <section className="relative">
            <div className="w-full h-full z-10 absolute opacity-40 bg-black"></div>
            <Image
              width={800}
              height={0}
              className="w-screen h-80"
              src={"/assets/library.png"}
              alt="library image"
            />
            <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-20 text-center">
              {/* <form onSubmit={SearchHandler}> */}
                <input
                  className="input-field w-[400px]"
                  name="query"
                  value={searchValue}
                  type="text"
                  placeholder="Search Products...."
                  onChange={handleChange}
                />
                {/* <button className="search-button" type="submit">Search</button> */}
              {/* </form> */}
              {/* <h1 className="text-3xl shadow-xl">
                There are more than 500+ Books for Free
              </h1>
              <span className="shadow-xl">
                Welcome to library management system. Goti Goti dhandyabad dina
                chahanxu hjr hjr..
              </span> */}
            </div>
          </section>
          {/* search books */}
          <section className="my-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-items-center gap-y-12 gap-x-12">
              {BookListsURL?.results?.map((value: any, index: number) => {
                return (
                  <div key={index}>
                    <div className="shadow-md hover:shadow-xl hover:scale-105 hover:duration-500 h-[25rem]">
                      <Link href={`/book-list/${value?.id}/`}>
                        <div className="relative w-60 h-72 mb-2">
                          {value?.cover && (
                            <Image
                              fill
                              sizes="fit"
                              src={value?.cover}
                              alt="cover image"
                            />
                          )}
                        </div>
                        <div className=" pl-4 pb-2">
                          <h3 className="font-semibold" id="card_title">
                            {value?.title}
                          </h3>
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
                  </div>
                );
              })}
            </div>
          </section>
          {loading && (
            <div className="text-center text-xl h-96">Loading.....</div>
          )}

          {/*--------------------latest books----------------------- */}
          {/* <Container>
            <BookCardList />
          </Container> */}
        </div>

        {/* -------------------affordable books----------------------- */}
        {/* <AffordableBookCard imageUrl={affordableBooksList} /> */}
      </HomeLayout>
    </>
  );
};

export default page;
