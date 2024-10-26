import React from "react";
import Heading from "./Heading";
import Container from "../Container";
import BookCard from "./BookCard";

const BestBooksPage = () => {
  const BestSeller = [
    {
      cover: "/assets/latestBooks/latest_book_1.png",
      title:
        "J.R.R. Tolkien 4-Book Boxes set: The Hobbit and The Lord of the Rings",
      publisher: "Ballantine Books",
      price: 2838.33,
    },
    {
      cover: "/assets/latestBooks/latest_book_2.png",
      title: "Gone with the Wind",
      publisher: "Warner Books",
      price: 748.84,
    },
    {
      cover: "/assets/latestBooks/latest_book_3.png",
      title: "The Giving Tree",
      publisher: "HarperCollins Publishers",
      price: 653.55,
    },
    {
      cover: "/assets/latestBooks/latest_book_4.png",
      title: "The Princess Bride",
      publisher: "Ballantine Books",
      price: 836.07,
    },
    {
      cover: "/assets/latestBooks/latest_book_5.png",
      title: "Wuthering Heights",
      publisher: "Norton",
      price: 366.37,
    },
  ];
  return (
    <Container>
      <BookCard booksUrl={BestSeller} />
    </Container>
  );
};

export default BestBooksPage;
