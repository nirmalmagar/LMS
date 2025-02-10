"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import HomeLayout from "@/components/Layouts/HomeNavBar/HomeLayout";
import { Lora } from "next/font/google";
import routes from "@/utils/userRoutes";
import { getFetcher } from "@/helpers/FetchHelper";
import useSWR from "swr";
import BookCard from "@/components/BookCard";
import Cookies from "js-cookie";

const lora = Lora({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-lora",
  style: ["normal", "italic"],
});

const HomePage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const { data: BookListsURL, isLoading: loading } = useSWR(
    `${process.env.HOST}books/?query=${searchValue}`,
    getFetcher
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const logout = useCallback(() => {
    Cookies.remove("LOGIN_TOKEN");
    Cookies.remove("USER_ID");
    window.location.reload();
  }, []);

  useEffect(() => {
    const token = Cookies.get("LOGIN_TOKEN"); // Fetch token on the client
    const user_id = Cookies.get("USER_ID");
    if (token && user_id) {
      setIsLoggedIn(true);
    }
  }, [logout]);
  return (
    <>
      <HomeLayout>
        {/* -------------------Hero page------------------------ */}
        <div className="ml-16 z-20 absolute top-0">
          <Image
            width={80}
            height={80}
            src={"/assets/logo.png"}
            alt="logo"
            sizes="fit"
          />
        </div>
        <ul className="absolute z-20 top-3 right-12 float-right text-white flex gap-x-16 text-[15px] font-semibold tracking-wider cursor-pointer font-sans">
          {isLoggedIn ? (
            <button
              onClick={logout}
              className="hover:bg-blue-800 bg-blue-500 px-4 py-1 rounded-md"
            >
              Logout
            </button>
          ) : (
            <>
              {/* <div className="absolute top-[20%] left-8 flex gap-x-12 "> */}
              <Link
                href={routes.USER_AUTH_LOGIN}
                className="hover:bg-blue-800 bg-blue-500 px-4 py-1 rounded-md"
              >
                Login
              </Link>
              <Link
                href={routes.USER_AUTH_SIGN_UP}
                className="hover:bg-blue-800 bg-blue-500 px-4 py-1 rounded-md"
              >
                Sigup
              </Link>
              {/* </div> */}
            </>
          )}
        </ul>
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
              GYAN KOSH
            </p>

            <ul className="flex ml-10 gap-x-16 text-[17px] tracking-wider font-medium my-6 cursor-pointer font-sans">
              <li className="hover:text-orange-600">
                <Link href={"/"}>Home</Link>
              </li>
              <li className="hover:text-orange-600">About</li>
              <li className="hover:text-orange-600">Catalog</li>
              <li className="hover:text-orange-600">Services</li>
              <li className="hover:text-orange-600">Contacts</li>
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
                Welcome to library management system. Explore Fresh Arrivals and
                Find Your Next Great Read.
              </span>
            </div>
          </div>
        </section>
        {/*--------------------latest books----------------------- */}
        <Container>
          <section className="my-12">
            {/* <Heading title="Books">
              Explore Fresh Arrivals and Find Your Next Great Read.
            </Heading>
            {BookListsURL?.results?.length <= 0 ? ( */}

            <BookCard url={BookListsURL} />

            {/* ) : ( 
              <div className="text-center text-3xl h-60 mt-20">
                ---------------Search Book doesn't Exist-----------------
              </div>
            )} */}
          </section>
          {loading && (
            <div className="text-center text-xl h-96">Loading.....</div>
          )}
        </Container>

        {/* -------------------affordable books----------------------- */}
        {/* <AffordableBookCard imageUrl={affordableBooksList} /> */}
        {/* <Container> */}
        {/* <BookCardList /> */}
        {/* <BookCard url={BookListsURL} /> */}
        {/* </Container> */}
      </HomeLayout>
    </>
  );
};

export default HomePage;
