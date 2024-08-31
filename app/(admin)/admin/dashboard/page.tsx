"use client";
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/Navbar/DefaultLayout";
const page = () => {
  
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/blog/list`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("books_data",data)
        setBooks(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <DefaultLayout>
        <h1>Hello this is admin dashboarddd</h1>
      </DefaultLayout>
    </div>
  );
};

export default page;
