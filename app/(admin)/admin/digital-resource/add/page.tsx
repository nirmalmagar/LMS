"use client";
import React, { useContext } from "react";
import Modal from "@/components/Elements/Modal";
import TableHead from "@/components/Elements/TableHead/TableHead";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { useState, FormEvent } from "react";
import InputField from "@/components/Form/InputForm";
import Btn from "@/components/Btn";
import Image from "next/image";
import { accessToken } from "@/helpers/TokenHelper";
import { toast } from "react-toastify";
import Multiselect from "multiselect-react-dropdown";
import { AuthContext } from "@/context/AuthContext";

interface genresListProps{
  id:number;
  name:string;
}
const AddDigitalResource = () => {
  const { genres } = useContext(AuthContext);
  const [showPopUpModal, setShowPopUpModal] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>("");
  const [inputFieldValue, setInputFieldValue] = useState<Record<string, string>>({});
  const [selectedGenreIds, setSelectedGenreIds] = useState<number[]>([]); // Array to store selected genre IDs

  // Callback for when an item is selected
  const handleSelect = (selectedList:genresListProps[]) => {
    const ids = selectedList.map((genre) => genre.id); // Extract IDs from selected items
    setSelectedGenreIds(ids); // Update state
  };

  // Callback for when an item is removed
  const handleRemove = (selectedList:genresListProps[]) => {
    const ids = selectedList.map((genre) => genre.id); // Extract IDs from remaining items
    setSelectedGenreIds(ids); // Update state
  };

  // image change handler
  const ImageChangeHandler = (e: any) => {
    const imageURL = e.target.files[0];
    setImageUrl(URL.createObjectURL(imageURL));
  };

  const removeImage = () => {
    setImageUrl(null);
  };

  // input field

  const handleFieldChange = (key: string, value: string): void => {
    if (key && value) {
      setInputFieldValue((prev) => ({ ...prev, [key]: value }));
    } else {
      // setGenres((prevGenres)=>[...prevGenres,currentGenres])
    }
  };

  // book add button
  const handleAddBooks = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const InputFileData = {
      title: inputFieldValue?.title,
      description: inputFieldValue?.description,
      author: inputFieldValue?.author,
      publisher: inputFieldValue?.publisher,
      price: inputFieldValue?.price,
      pages: inputFieldValue?.pages,
      quantity: inputFieldValue?.quantity,
      isbn: inputFieldValue?.isbn,
      genres: selectedGenreIds,
    };
    try {
      const response = await fetch(`${process.env.HOST}digital-resources/`, {
        method: "POST",
        body: JSON.stringify(InputFileData),
        headers: {
          Authorization: `Bearer ${accessToken()}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success) {
        toast.success("data successfully insert");
      } else {
        toast.error("some error on field");
      }
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
                  placeholder="enter title"
                  type="text"
                  defaultValue={inputFieldValue?.title}
                  onChange={(e: any) => {
                    handleFieldChange("title", e.target.value);
                  }}
                />
                <InputField
                  label="Author"
                  name="author"
                  placeholder="enter author"
                  type="text"
                  defaultValue={inputFieldValue?.author}
                  onChange={(e: any) => {
                    handleFieldChange("author", e.target.value);
                  }}
                />
                <InputField
                  label="Publisher"
                  name="text"
                  placeholder="enter publisher"
                  type="text"
                  defaultValue={inputFieldValue?.publisher}
                  onChange={(e: any) => {
                    handleFieldChange("publisher", e.target.value);
                  }}
                />
                <InputField
                  label="Pages"
                  name="pages"
                  placeholder="Enter pages"
                  defaultValue={inputFieldValue?.pages}
                  onChange={(e: any) => {
                    handleFieldChange("pages", e.target.value);
                  }}
                />
                <InputField
                  label="Price"
                  name="price"
                  placeholder="Enter price"
                  defaultValue={inputFieldValue?.price}
                  onChange={(e: any) => {
                    handleFieldChange("price", e.target.value);
                  }}
                />
                <InputField
                  label="Quantity"
                  name="quantity"
                  placeholder="Enter quantity"
                  defaultValue={inputFieldValue?.quantity}
                  onChange={(e: any) => {
                    handleFieldChange("quantity", e.target.value);
                  }}
                />
                <InputField
                  label="Isbn"
                  name="isbn"
                  placeholder="Enter isbn"
                  defaultValue={inputFieldValue?.isbn}
                  onChange={(e: any) => {
                    handleFieldChange("isbn", e.target.value);
                  }}
                />
                <div className="flex gap-24">
                  <label htmlFor="">Genres</label>
                  <Multiselect
                    className="text-sm leading-4 w-full flex-1"
                    options={genres} // Data to display
                    displayValue="name" // The key to display (update based on your object structure)
                    onSelect={handleSelect} // Callback for when an item is selected
                    onRemove={handleRemove} // Callback for when an item is removed
                  />
                </div>
                <InputField
                  type="textarea"
                  label="Description"
                  name="description"
                  placeholder="enter description"
                  defaultValue={inputFieldValue?.description}
                  onChange={(e: any) => {
                    handleFieldChange("description", e.target.value);
                  }}
                />
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

export default AddDigitalResource;
