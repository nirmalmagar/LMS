import React from "react";
import Image from "next/image";
import Link from "next/link";
import { routes } from "@/utils/routes";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import Container from "@/components/Container";
import Footer from "@/components/HomePages/Footer";
import Heading from "@/components/HomePages/Heading";
import AffordableBookCard from "@/components/HomePages/AffordableBookCard";
import BookCard from "@/components/HomePages/BookCard";

const page = () => {
  const affordableBooksList = [
    "/assets/books/image.png",
    "/assets/books/image2.png",
    "/assets/books/image3.png",
    "/assets/books/image4.png",
    "/assets/books/image5.png",
  ];
  const NewArrivalsBooks = [
    {
      id: 1,
      cover: "/assets/latestBooks/latest_book_1.png",
      title:
        "J.R.R. Tolkien 4-Book Boxes set: The Hobbit and The Lord of the Rings",
      publisher: "Ballantine Books",
      price: 2838.33,
    },
    {
      id: 2,
      cover: "/assets/latestBooks/latest_book_2.png",
      title: "Gone with the Wind",
      publisher: "Warner Books",
      price: 748.84,
    },
    {
      id: 3,
      cover: "/assets/latestBooks/latest_book_3.png",
      title: "The Giving Tree",
      publisher: "HarperCollins Publishers",
      price: 653.55,
    },
    {
      id: 4,
      cover: "/assets/latestBooks/latest_book_4.png",
      title: "The Princess Bride",
      publisher: "Ballantine Books",
      price: 836.07,
    },
    {
      id: 5,
      cover: "/assets/latestBooks/latest_book_5.png",
      title: "Wuthering Heights",
      publisher: "Norton",
      price: 366.37,
    },
  ];
  const BestSellerBooks = [
    {
      id: 6,
      cover: "/assets/bestSellerBooks/book1.png",
      title: "Bhagavad Gita As It Is (Neplai Translation)",
      publisher: "Maharishi Vedvyas Ji",
      price: 650,
    },
    {
      id: 7,
      cover: "/assets/bestSellerBooks/book2.png",
      title: "Atomic Habits",
      publisher: "James Clear",
      price: 1438,
    },
    {
      id: 8,
      cover: "/assets/bestSellerBooks/book3.png",
      title: "The 48 Laws Of Power",
      publisher: "Robert Greene",
      price: 1598,
    },
    {
      id: 9,
      cover: "/assets/bestSellerBooks/book4.png",
      title: "React Dady Poor Dad",
      publisher: "Robert T. Kiyoaki",
      price: 958,
    },
    {
      id: 10,
      cover: "/assets/bestSellerBooks/book5.png",
      title: "Think Like A Monk",
      publisher: "Jay Shetty",
      price: 798,
    },
  ];
  return (
    <>
      <div>
        {/* ----------------navbar---------------- */}
        <div className="bg-gray-100 fixed top-0 z-40 w-full">
          <Container>
            <nav className=" items-center flex justify-between">
              <div className="relative w-14 h-14">
                <Image fill src={"/assets/logo.png"} alt="LMS logo" />
              </div>
              <ul className="flex gap-x-20 font-semibold text-[17px] cursor-pointer">
                <li className="hover:text-blue-800">Home</li>
                <li className="hover:text-blue-800">
                  <Link href={routes.ADMIN_AUTH_LOGIN}>Login</Link>
                </li>
                <li className="hover:text-blue-800">Membership</li>
                <li className="hover:text-blue-800">NPR</li>
                <li className="hover:text-blue-800">
                  <ShoppingBagIcon className="w-6 h-6" />
                </li>
              </ul>
            </nav>
          </Container>
        </div>
        {/* -------------------Hero page------------------------ */}
        <section className="relative">
          <Image
            width={800}
            height={0}
            className="w-screen h-80"
            src={"/assets/library.png"}
            alt="library image"
          />
          <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] font-serif text-center text-white font-semibold">
            <h1 className="text-3xl shadow-xl">
              There are more than 500+ Books for Free
            </h1>
            <span className="shadow-xl">
              Welcome to library management system. Goti Goti dhandyabad dina
              chahanxu hjr hjr..
            </span>
          </div>
        </section>
        {/*--------------------latest books----------------------- */}
        <Container>
          <Heading title="New Arrivals">
            Explore Fresh Arrivals and Find Your Next Great Read.
          </Heading>
        </Container>
        <BookCard booksUrl={NewArrivalsBooks} />
      </div>

      {/* -------------------affordable books----------------------- */}
      <AffordableBookCard imageUrl={affordableBooksList} />

      {/* ---------------------------Best sellers books----------------------- */}
      <Container>
        <Heading title="Best Sellers">
          Discover the Most Popular Books in Our Frequently Updated Best Sellers
          Collection.
        </Heading>
      </Container>
      <BookCard booksUrl={BestSellerBooks} />

      {/* --------------------------footer-------------------- */}
      <Footer />
    </>
  );
};

export default page;
