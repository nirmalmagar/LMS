import Image from "next/image";
import React from "react";
import Container from "../Container";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-black text-white py-16 font-sans">
      <Container>
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-12">
          <div className="inline-flex sm:col-span-2 mt-8">
            <div className="relative inline-flex mr-4 w-40 h-20">
              <Image fill src={"/assets/books/Image.png"} alt="logo" />
            </div>
            <p className="font-semibold text-lg leading-6">
              NeplaiBook offers a world of stories and insights. Discover our
              curated collection of fiction, non-fiction, and classics, and
              transform your reading journey. Explore a new adventure with every
              book.
            </p>
          </div>
          <div>
            <span className="font-bold">Quick links</span>
            <ul className="mt-2">
              <li>
                <Link href={"#"}>About Us</Link>
              </li>
              <li>
                <Link href={"#"}>New Arrivals</Link>
              </li>
              <li>
                <Link href={"#"}>Find a Store</Link>
              </li>
              <li>
                <Link href={"#"}>Contact Us</Link>
              </li>
            </ul>
          </div>
          <div>
            <span className="font-bold">Get In Touch</span>
            <ul className="mt-2">
              <li>
                <span className="font-semibold">Address:</span> Thamel,
                Kathmandu 44600
              </li>
              <li>
                <span className="font-semibold">Mobile no:</span> 98637261273
              </li>
              <li>
                <span className="font-semibold">Email:</span> lms@gmail.com
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
