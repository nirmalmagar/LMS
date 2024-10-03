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
  console.log("env.local",`${process.env.HOST}books/`)
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
    };
  
    const apiUrl = `${process.env.HOST}books/`; // Ensure correct URL
    console.log("access token",accessToken)
    try {
      if (!process.env.HOST) {
        throw new Error("HOST environment variable is not set.");
      }
  
      const response = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(InputFormData),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      toast.success("Book added successfully");
    } catch (error: any) {
      console.log("Error during fetch:", error);
      toast.error("An error occurred");
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
        <Btn className="bg-blue-400" type="submit">Submit</Btn>
      </form>
    </DefaultLayout>
  );
};

export default BooksAddPage;
