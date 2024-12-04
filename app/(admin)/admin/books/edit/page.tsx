"use client";
import React, { FormEvent, useState } from "react";
import DefaultLayout from "@/components/Layouts/Navbar/DefaultLayout";
import InputField from "@/components/Form/InputForm";
import Btn from "@/components/Btn";
import { accessToken } from "@/helpers/TokenHelper";
import { toast } from "react-toastify";

const BooksAddPage = () => {
  const [inputFormValue, setInputFormValue] = useState<Record<string, any>>({});
  const handleChangeInput = (value: string, key: string) => {
    setInputFormValue((prev) => ({ ...prev, [key]: value }));
  };
  // const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const InputFormData = {
  //     title: inputFormValue?.title,
  //     description: inputFormValue?.description,
  //     author: inputFormValue?.author,
  //     publisher: inputFormValue?.publisher,
  //   };

  //   try {
  //     const response = await fetch(`${process.env.HOST}books/`, {
  //       method: "POST",
  //       body: JSON.stringify(InputFormData),
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },
  //     });

  //     const result = await response.json();
      
  // }catch (error) {
  //     console.log("result error",error);
  //     toast.error("error occure")
  //   }
  // };
  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const InputFormData = {
      title: inputFormValue?.title,
      description: inputFormValue?.description,
      author: inputFormValue?.author,
      publisher: inputFormValue?.publisher,
      pages: inputFormValue?.pages,
      price: inputFormValue?.price,
      quantity: inputFormValue?.quantity,
      isbn: inputFormValue?.isbn,
      genres: inputFormValue?.genres,
    };
  
    const addBookURL = `${process.env.HOST}books/`;
    try {
      const response = await fetch(addBookURL, {
        method: "POST",
        body: JSON.stringify(InputFormData),
        headers: {
          Authorization: `Bearer ${accessToken()}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const result = await response.json();
      if(response.ok){
        toast.success("Book added successfully");
      }
      else {
        toast.error(`something went wrong`);
      }
    } catch (error: any) {
      toast.error("Error during fetch:");
    }
  };
  
  return (
    <DefaultLayout>
      <form onSubmit={handleSubmitForm}>
        <InputField
          label="Title"
          name="title"
          placeholder="Enter something for title.."
          value={inputFormValue?.title}
          onChange={(e: any) => {
            handleChangeInput("title", e.target.value);
          }}
        />
        <InputField
          label="Description"
          name="description"
          placeholder="Enter description"
          value={inputFormValue?.description}
          onChange={(e: any) => {
            handleChangeInput("description", e.target.value);
          }}
        />
        <InputField
          label="Author"
          name="author"
          placeholder="Enter author name"
          value={inputFormValue?.author}
          onChange={(e: any) => {
            handleChangeInput("author", e.target.value);
          }}
        />
        <InputField
          label="Publisher"
          name="publisher"
          placeholder="Enter publisher"
          value={inputFormValue?.publisher}
          onChange={(e: any) => {
            handleChangeInput("publisher", e.target.value);
          }}
        />
        <InputField
          label="Pages"
          name="pages"
          placeholder="Enter pages"
          value={inputFormValue?.pages}
          onChange={(e: any) => {
            handleChangeInput("pages", e.target.value);
          }}
        />
        <InputField
          label="Price"
          name="price"
          placeholder="Enter price"
          value={inputFormValue?.price}
          onChange={(e: any) => {
            handleChangeInput("price", e.target.value);
          }}
        />
        <InputField
          label="Quantity"
          name="quantity"
          placeholder="Enter quantity"
          value={inputFormValue?.quantity}
          onChange={(e: any) => {
            handleChangeInput("quantity", e.target.value);
          }}
        />
        <InputField
          label="Isbn"
          name="isbn"
          placeholder="Enter isbn"
          value={inputFormValue?.isbn}
          onChange={(e: any) => {
            handleChangeInput("isbn", e.target.value);
          }}
        />
        <InputField
          label="Genres"
          name="genres"
          placeholder="Enter genres"
          value={inputFormValue?.genres}
          onChange={(e: any) => {
            handleChangeInput("genres", e.target.value);
          }}
        />
        <Btn className="bg-blue-400" type="submit">Submit</Btn>
      </form>
    </DefaultLayout>
  );
};

export default BooksAddPage;
