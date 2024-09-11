"use client";
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/Navbar/DefaultLayout";
const page = () => {
  const [booksList, setBooksList] = useState({});

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.HOST}books/`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBooksList(data);
        console.log("books_data", booksList);
        // setBooks(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <DefaultLayout>
        {/* {booksList.map((value, key) => {
          return (
            <>
              <h1>{value.title}</h1>
            </>
          );
        })} */}
        <h1>Hello this is admin dashboarddd</h1>
      </DefaultLayout>
    </div>
  );
};