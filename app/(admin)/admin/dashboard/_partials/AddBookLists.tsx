"use client";
import React from "react";
import Modal from "@/components/Elements/Modal";
import TableHead from "@/components/Elements/TableHead/TableHead";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { useState, FormEvent } from "react";
import InputField from "@/components/Form/InputForm";
import Btn from "@/components/Btn";
import Image from "next/image";
import { accessToken } from "@/helpers/TokenHelper";

const AddBookLists = () => {
  const [showPopUpModal, setShowPopUpModal] = useState<boolean>(false);
  const [inputFieldValue, setInputFieldValue] = useState<
    Record<string, string>
  >({});
  const [imageUrl, setImageUrl] = useState<string | null>("");

  const ImageChangeHandler = (e: any) => {
    const imageURL = e.target.files[0];
    setImageUrl(URL.createObjectURL(imageURL));
  };

  const removeImage = () => {
    setImageUrl(null);
  };

  const handleFieldChange = (key: string, value: string): void => {
    setInputFieldValue((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddBooks = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setShowPopUpModal(false);
    const InputFileData = {
      title: inputFieldValue?.title,
      description: inputFieldValue?.description,
      author: inputFieldValue?.author,
      publisher: inputFieldValue?.publisher,
    };
    try {
      const response = await fetch(`${process.env.HOST}books/`, {
        method: "POST",
        body: JSON.stringify(InputFileData),
        headers: {
          Authorization: `Bearer ${accessToken()}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <TableHead
        className="px-2 py-4"
        size="small"
        tableName="Books List"
        // routeLink={routes.ADMIN_BOOKS_ADD}
        addTitle="Add Book"
        onClick={() => setShowPopUpModal(true)}
      />
      <Modal
        show={showPopUpModal}
        handleClose={() => setShowPopUpModal(false)}
        modalTitle="Add Books"
        size="lg"
      >
        <form id="lead-form" onSubmit={handleAddBooks}>
          <div className=" px-4 py-4 rounded-lg border border-gray-200">
            <div>
              <div className=" flex flex-col gap-y-4">
                <div className="flex gap-x-4 items-center">
                  <div className="relative w-12 h-12">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        className="rounded"
                        objectFit="cover"
                        fill
                        alt={"image link"}
                      />
                    ) : (
                      <PhotoIcon
                        className="h-full w-full text-primary-500"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <InputField
                    labelClassName="text-black"
                    className="flex flex-col"
                    label="Cover"
                    name="cover"
                    type="file"
                    onChange={(e) => ImageChangeHandler(e)}
                  />
                  {imageUrl && (
                    <Btn
                      onClick={removeImage}
                      className="bg-red-500 text-white font-semibold mb-0"
                    >
                      remove
                    </Btn>
                  )}
                </div>

                <InputField
                  labelClassName="text-black"
                  label="Title"
                  name="title"
                  type="text"
                  value={inputFieldValue?.title}
                  onChange={(e: any) => {
                    handleFieldChange("title", e.target.value);
                  }}
                />

                <InputField
                  label="Author"
                  name="author"
                  type="text"
                  value={inputFieldValue?.author}
                  onChange={(e: any) => {
                    handleFieldChange("author", e.target.value);
                  }}
                />
                <InputField
                  label="Publisher"
                  name="text"
                  type="text"
                  value={inputFieldValue?.publisher}
                  onChange={(e: any) => {
                    handleFieldChange("publisher", e.target.value);
                  }}
                />

                <InputField
                  type="textarea"
                  label="Description"
                  name="description"
                  value={inputFieldValue?.description}
                  onChange={(e: any) => {
                    handleFieldChange("description", e.target.value);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="bg-white sticky left-4 bottom-0 right-4 pt-6 border-gray-200 flex items-end  justify-between">
            <Btn
              outline="error"
              onClick={() => {
                setShowPopUpModal(false);
                // setClearSelectValue(true);
              }}
            >
              Cancel
            </Btn>

            <div className="flex gap-x-4">
              <Btn type="submit" className="bg-blue-600 text-white">
                Submit
              </Btn>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddBookLists;
