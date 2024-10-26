import React from "react";
import { BookmarkSquareIcon } from "@heroicons/react/16/solid";
import Container from "../Container";
import Image from "next/image";

interface ImageUrlProps{
  imageUrl:string[];
}

const CheapBookCard:React.FC<ImageUrlProps> = ({imageUrl}) => {
  return (
    <>
      {/* book under 250 rs */}
      <div className="bg-blue-50 py-20">
        <Container className="flex xl:flex-row flex-col xl:justify-between items-center justify-center xl:gap-y-0 gap-y-8">
          <div className="">
            <BookmarkSquareIcon className="w-16 h-14 inline-flex" />
            <span className="inline-flex font-bold text-3xl">
              Used Books Starting at Just
              <br /> Rs. 250
            </span>
            <p className="py-4 font-serif">
              Explore a Wide Range of Popular Used Books in Excellent Condition.
            </p>
            <button className="uppercase border xl:mt-14 mt-4 border-blue-600 text-blue-800 hover:bg-blue-900 hover:text-white bg-white rounded-md px-6 py-0.5 font-semibold">
              explore books
            </button>
          </div>
          <div className="relative z-20">
            <div className="flex gap-x-4">
              {imageUrl?.map((imageUrl, index) => {
                return (
                  <Image
                    key={index}
                    width={100}
                    height={60}
                    src={imageUrl}
                    alt={imageUrl}
                  />
                );
              })}
            </div>
            <div className="absolute -right-3 top-36 w-[616px] h-14 -mr-3  -z-10">
              <Image fill src={"/assets/books/wood.png"} alt="image wood" />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default CheapBookCard;
