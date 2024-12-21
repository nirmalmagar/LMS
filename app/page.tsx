import React from "react";
import Image from "next/image";
import Container from "@/components/Container";
import AffordableBookCard from "@/components/HomePages/AffordableBookCard";
import HomeLayout from "@/components/Layouts/HomeNavBar/HomeLayout";
import BookCardList from "./book-list/_partials/BookCardList";

const page = () => {
  const affordableBooksList = [
    "/assets/books/image.png",
    "/assets/books/image2.png",
    "/assets/books/image3.png",
    "/assets/books/image4.png",
    "/assets/books/image5.png",
  ];
  return (
    <>
      <HomeLayout>
        <div id="home">
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
            <BookCardList />
          </Container>
        </div>

        {/* -------------------affordable books----------------------- */}
        <AffordableBookCard imageUrl={affordableBooksList} />
      </HomeLayout>
    </>
  );
};

export default page;
