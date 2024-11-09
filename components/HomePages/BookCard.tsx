import React from "react";
import Container from "../Container";
import Image from "next/image";
import { BookListProps } from "@/interfaces/book_list.interface";
import Btn from "../Btn";

interface ListBookObject {
  booksUrl: BookListProps;
}
const BookCard: React.FC<ListBookObject> = ({ booksUrl }) => {
  return (
    <>
      <Container>
        <section className="my-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-items-center gap-y-12 gap-x-12">
            {booksUrl?.map((value: any, index: number) => {
              return (
                <div key={index} className="">
                  <div className="">
                    <div className="relative w-60 h-72 mb-2">
                      <Image fill src={value?.cover} alt="cover image" />
                    </div>
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
                  <div className="my-2 py-1 border-2 border-blue-400 text-center rounded-sm hover:bg-blue-400 font-semibold hover:text-white">
                    ADD TO CART
                  </div>
                </div>
              );
            })}
          </div>
          <button className="w-full text-center mt-4 text-md">View All</button>
        </section>
      </Container>
    </>
  );
};

export default BookCard;
