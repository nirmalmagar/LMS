import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Modal from "./Elements/Modal";
import InputField from "./Form/InputForm";
import Btn from "./Btn";
import { toast } from "react-toastify";
import { accessToken } from "@/helpers/TokenHelper";

interface bookUrlProps {
  url: any;
}
const BookCard: React.FC<bookUrlProps> = ({ url }) => {
  const [showPopUpModal, setShowPopUpModal] = useState<boolean>(false);
  const [inputFieldValue, setInputFieldValue] = useState<Record<string, any>>(
    {}
  );
  const [error, setError] = useState<Record<string, any>>({});
  const [bookId, setBookId] = useState<any>();

  const handleCloseTap = () => {
    setShowPopUpModal(false);
    setInputFieldValue({});
  };
  const borrowHandle = (book_id: any) => {
    setBookId(book_id);
    setShowPopUpModal(true);
  };

  const handleFieldChange = (key: string, value: any): void => {
    if (key && value) {
      setInputFieldValue((prev) => ({ ...prev, [key]: value }));
    }
  };
  const handleAddBorrow = async (e: any) => {
    e.preventDefault();
    const formData = {
      days: inputFieldValue?.days,
    };
    try {
      const response = await fetch(
        `${process.env.HOST}books/${bookId}/borrow-book/`,
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            Authorization: `Bearer ${accessToken()}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success(data?.message);
        handleCloseTap();
        // mutate();
      } else {
        toast.error(data?.error?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleReserve = async (id:any) => {
    // const formData = {
    //   days: inputFieldValue?.days,
    // };
    try {
      const response = await fetch(
        `${process.env.HOST}books/${id}/reserve-book/`,
        {
          method: "POST",
          // body: JSON.stringify(formData),
          headers: {
            Authorization: `Bearer ${accessToken()}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success("Reserved Successfully");
        // handleCloseTap();
        // mutate();
      } else {
        toast.error(data?.error?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Modal
        show={showPopUpModal}
        handleClose={handleCloseTap}
        modalTitle="Add Days"
        size="lg"
      >
        <form id="lead-form" onSubmit={handleAddBorrow}>
          <div className=" px-4 py-4 rounded-lg border border-gray-200">
            <InputField
              type="number"
              label="Days"
              name="days"
              placeholder="enter Days"
              defaultValue={inputFieldValue?.days}
              fieldErrors={error?.days}
              onChange={(e: any) => {
                handleFieldChange("days", e.target.value);
              }}
            />
          </div>

          <div className="bg-white sticky left-4 bottom-0 right-4 pt-6 border-gray-200 flex items-end  justify-between">
            <Btn
              outline="error"
              onClick={() => {
                setShowPopUpModal(false);
                setInputFieldValue({});
                setError({});
              }}
            >
              Cancel
            </Btn>

            <div className="flex gap-x-4">
              <Btn type="submit" className="bg-blue-600 text-white">
                Add
              </Btn>
            </div>
          </div>
        </form>
      </Modal>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 xl:grid-cols-5 place-items-center gap-y-12 gap-x-12">
        {url?.results?.map((value: any, index: number) => {
          return (
            <div key={index}>
              <div className="shadow-md hover:shadow-xl hover:scale-105 hover:duration-500 h-[25rem]">
                <Link href={`/book-list/${value?.id}/`}>
                  <div className="relative w-60 h-72 mb-2">
                    {value?.cover && (
                      <Image
                        fill
                        sizes="fit"
                        src={value?.cover}
                        alt="cover image"
                      />
                    )}
                  </div>
                  <div className=" pl-4 pb-2">
                    <h3 className="font-semibold" id="one_line">
                      {value?.title}
                    </h3>
                    <div className="flex mt-1 gap-x-0.5">
                      <span className="font-semibold">By:</span>
                      <p id="card_title">{value?.author}</p>
                    </div> 
                  </div>
                </Link>
                {/* <div className="flex px-4 justify-between">
                  <button
                    className="bg-blue-500 px-3 py-1 rounded-md text-sm text-white"
                    onClick={() => borrowHandle(value?.id)}
                  >
                    Borrow
                  </button>
                  <button 
                    className="bg-blue-500 px-3 py-1 rounded-md text-sm text-white"
                    onClick={() => handleReserve(value?.id)}
                  >
                    Reserve
                  </button>
                </div> */}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BookCard;
