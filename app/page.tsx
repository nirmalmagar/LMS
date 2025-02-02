"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import AffordableBookCard from "@/components/HomePages/AffordableBookCard";
import HomeLayout from "@/components/Layouts/HomeNavBar/HomeLayout";
import BookCardList from "./book-list/_partials/BookCardList";
import { Figtree, Lora } from "next/font/google";
import routes from "@/utils/userRoutes";
import { getFetcher } from "@/helpers/FetchHelper";
import useSWR from "swr";
import Heading from "@/components/HomePages/Heading";

const lora = Lora({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-lora",
  style: ["normal", "italic"],
});

const affordableBooksList = [
  "/assets/books/image.png",
  "/assets/books/image2.png",
  "/assets/books/image3.png",
  "/assets/books/image4.png",
  "/assets/books/image5.png",
];
const page = () => {
  const [searchValue, setSearchValue] = useState("");
  const { data: BookListsURL, isLoading: loading } = useSWR(
    `${process.env.HOST}books/?query=${searchValue}`,
    getFetcher
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <HomeLayout>
      {/* -------------------Hero page------------------------ */}
      <section className="relative">
        <Image
          width={800}
          height={0}
          className="w-screen h-[500px]"
          src={"/assets/library_bg.jpg"}
          alt="library image"
        />
        <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-center text-white">
          <p className={`text-2xl ${lora.className} tracking-widest`}>
            PUBLIC LIBRARY
          </p>
          <ul className="flex gap-x-16 text-[17px] tracking-wider font-medium my-6 cursor-pointer font-sans">
            <li className="hover:text-orange-600">
              <Link href={"/"}>Home</Link>
            </li>
            <li className="hover:text-orange-600">About</li>
            <li className="hover:text-orange-600">Catalog</li>
            <li className="hover:text-orange-600">Services</li>
            <li className="hover:text-orange-600">Contacts</li>
            <li className="hover:text-orange-600">
              <Link href={routes.USER_AUTH_LOGIN}>Login</Link>
            </li>
          </ul>
          <div className="mt-20">
            <div className="mb-14">
              <input
                className="px-2 py-3 border-black bg-gray-100 text-black rounded-lg w-[400px]"
                name="query"
                value={searchValue}
                type="text"
                placeholder="Search Books...."
                onChange={handleChange}
              />
            </div>
            <h1 className="text-4xl shadow-xl">
              There are more than 500+ Books for Free
            </h1>
            <span className="shadow-xl text-md mt-2 text-slate-200">
              Welcome to library management system. Goti Goti dhandyabad dina
              chahanxu hjr hjr..
            </span>
          </div>
        </div>
      </section>
      {/*--------------------latest books----------------------- */}
      <Container>
        <section className="my-12">
          <Heading title="Books">
            Explore Fresh Arrivals and Find Your Next Great Read.
          </Heading>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 xl:grid-cols-5 place-items-center gap-y-12 gap-x-12">
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
      </Container>

        <Container>
          <BookCardList />
        </Container>

        {/* -------------------affordable books----------------------- */}
        <AffordableBookCard imageUrl={affordableBooksList} />
        </HomeLayout>
    </>
  );
};

export default page;
