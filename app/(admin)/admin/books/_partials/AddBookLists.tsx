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

interface boookListProps{
  mutate:()=>void;
}
interface genresListProps{
  id:number;
  name:string;
}

const AddBookLists:React.FC<boookListProps> = ({mutate}) => {
  const { genres } = useContext(AuthContext);
  const [showPopUpModal, setShowPopUpModal] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>("");
  const [inputFieldValue, setInputFieldValue] = useState<Record<string, string>>({});
  const [selectedGenreIds, setSelectedGenreIds] = useState<number[]>([]); // Array to store selected genre IDs
  const [error, setError] = useState<Record<string,any>>({});
  // Callback for when an item is selected
  const handleSelect = (selectedList:genresListProps[]) => {
    const ids = selectedList?.map((genre) => genre?.id); // Extract IDs from selected items
    setSelectedGenreIds(ids); // Update state
  };

  // Callback for when an item is removed
  const handleRemove = (selectedList:genresListProps[]) => {
    const ids = selectedList?.map((genre) => genre?.id); // Extract IDs from remaining items
    setSelectedGenreIds(ids); // Update state
  };

  // image change handler
  const ImageChangeHandler = (e: any) => {
    const imageURL = e.target.files[0];
    setImageUrl(URL.createObjectURL(imageURL));
  };

  // input field
  const handleFieldChange = (key: string, value: string): void => {
    if (key && value) {
      setInputFieldValue((prev) => ({ ...prev, [key]: value }));
    }
  };

  function handleCloseModal(){
    setInputFieldValue({})
    setShowPopUpModal(false);
    setError({})
    setSelectedGenreIds([]);
  }
  // book add button
  const handleAddBooks = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Create a new FormData instance to handle file uploads
    const formData = new FormData();
    formData.append("title", inputFieldValue?.title);
    formData.append("description", inputFieldValue?.description);
    formData.append("author", inputFieldValue?.author);
    formData.append("publisher", inputFieldValue?.publisher);
    formData.append("price", inputFieldValue?.price.toString()); // Ensure it's a string for FormData
    formData.append("pages", inputFieldValue?.pages.toString());
    formData.append("quantity", inputFieldValue?.quantity.toString());
    formData.append("isbn", inputFieldValue?.isbn.toString());
    formData.append("genres", JSON.stringify(selectedGenreIds));
  
    // Append the image file if it exists
    if (imageUrl) {
      const fileInput = document.querySelector('input[name="cover"]') as HTMLInputElement;
      if (fileInput && fileInput.files) {
        formData.append("cover", fileInput.files[0]);
      }
    }
  
    try {
      const response = await fetch(`${process.env.HOST}books/`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken()}`,
          Accept: "application/json",
        },
      });
  
      const data = await response.json();
      if (response.ok) {
        toast.success(data?.message);
        handleCloseModal();
        mutate();
      } else {
        setError(data);
        toast.error(data?.genres ?? "An error occurred.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while uploading.");
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
        handleClose={() => handleCloseModal()}
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
                        // objectFit="cover"
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
                    accept="image/*"
                    fieldErrors={error?.cover ?? []}
                    onChange={(e) => ImageChangeHandler(e)}
                  />
                  {imageUrl && (
                    <Btn
                      onClick={()=>setImageUrl(null)}
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
                  fieldErrors={error?.title ?? []}
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
                  fieldErrors={error?.author ?? []}
                  onChange={(e: any) => {
                    handleFieldChange("author", e.target.value);
                  }}
                />
                <InputField
                  label="Publisher"
                  name="publisher"
                  placeholder="enter publisher"
                  type="text"
                  defaultValue={inputFieldValue?.publisher}
                  fieldErrors={error?.publisher ?? []}
                  onChange={(e: any) => {
                    handleFieldChange("publisher", e.target.value);
                  }}
                />
                <InputField
                  type="number"
                  label="Pages"
                  name="pages"
                  placeholder="Enter pages"
                  defaultValue={inputFieldValue?.pages}
                  fieldErrors={error?.pages ?? []}
                  onChange={(e: any) => {
                    handleFieldChange("pages", e.target.value);
                  }}
                />
                <InputField
                  type="number"
                  label="Price"
                  name="price"
                  placeholder="Enter price"
                  defaultValue={inputFieldValue?.price}
                  fieldErrors={error?.price ?? []}
                  onChange={(e: any) => {
                    handleFieldChange("price", e.target.value);
                  }}
                />
                <InputField
                  type="number"
                  label="Quantity"
                  name="quantity"
                  placeholder="Enter quantity"
                  defaultValue={inputFieldValue?.quantity}
                  fieldErrors={error?.quantity ?? []}
                  onChange={(e: any) => {
                    handleFieldChange("quantity", e.target.value);
                  }}
                />
                <InputField
                  type="number"
                  label="Isbn"
                  name="isbn"
                  placeholder="Enter isbn"
                  defaultValue={inputFieldValue?.isbn}
                  fieldErrors={error?.isbn ?? []}
                  onChange={(e: any) => {
                    handleFieldChange("isbn", e.target.value);
                  }}
                />
                <div className="flex gap-24">
                  <label htmlFor="">Genres</label>
                  <Multiselect
                    className="text-sm leading-4 w-full flex-1"
                    options={genres || []} // Data to display
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
                  fieldErrors={error?.description ?? []}
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
              onClick={() => handleCloseModal()}
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
