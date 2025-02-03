"use client";
import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Cookies from "js-cookie";
import { accessToken } from "@/helpers/TokenHelper";
import useSWR from "swr";
import DateToString from "@/components/DateConverter/DateToString";
import { defaultFetcher, getFetcher } from "@/helpers/FetchHelper";
import { CreditCardIcon } from "@heroicons/react/24/outline";
import { Button } from "@headlessui/react";
import Modal from "@/components/Elements/Modal";
import Btn from "@/components/Btn";
import { toast } from "react-toastify";
import Image from "next/image";

const BorrowHistory = () => {
  const [borrowHistory, setBorrowHistory] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPopUpModal, setShowPopUpModal] = useState(false);
  const [esewaPopUpModal, setEsewaPopUpModal] = useState(false);
  const [borrowBookTitle, setBorrowBookTitle] = useState<string>("");
  const [borrowId, setBorrowId] = useState<number>();

  const user_id = Cookies.get("USER_ID");
  const { data } = useSWR(
    `${process.env.HOST}borrow/user-borrow-list/?user=${user_id}`,
    defaultFetcher
  );

  const handlePayment = (id: number) => {
    setShowPopUpModal(true);
    setBorrowId(id);
  };
  const BookTitle=(title:string)=>{
    setBorrowBookTitle(title);
  }

  // esewa payment handle
  const handleEsewaPayment = async (borrow_id:any) => {
    const borrowID = {
      borrow_id: borrow_id
    }
    try {
      const response = await fetch(
        `${process.env.HOST}borrow/payment/esewa/initiate/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(borrowID),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to initiate payment");
      }

      const formData = await response.json();

      if (typeof window !== "undefined") {
        const form = document.createElement("form");
        form.method = "POST";
        form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

        for (const key in formData) {
          if (Object.prototype.hasOwnProperty.call(formData, key)) {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = formData[key];
            form.appendChild(input);
          }
        }

        document.body.appendChild(form);
        form.submit();
      }
    } catch (error) {
      console.error("Payment initiation error:", error);
    }
  };

  // khalti payment handle
  const handleKhaltiPayment = async ( book_title:any) => {
    const payload = {
      website_url: "http://localhost:3000", 
      // amount: booking.total_amount,
      purchase_order_id: borrowId,
      purchase_order_name: book_title,
    };
  
    try {
      const response = await fetch(`${process.env.HOST}borrow/${borrowId}/payment/khalti/initiate/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error("Failed to initiate payment");
      }
  
      const data = await response.json();
  
      if (data.pidx) {
        window.location.href = data.payment_url;
      }
    } catch (error) {
      toast.error("Payment initiation error");
      console.error("Payment initiation error:", error);
    }
  };

  const handleCloseTap = () => {
    setShowPopUpModal(false);
  };

  return (
    <>
      {/* payment popup modal */}
      <Modal
        show={showPopUpModal}
        handleClose={handleCloseTap}
        modalTitle="e-wallet"
        size="lg"
      >
          <div className="flex justify-evenly my-8">
            <button 
              onClick={()=>handleEsewaPayment(borrowId)}
            >
              <Image
                width={100}
                height={100}
                objectFit="cover"
                alt="esewa logo"
                src={"/assets/esewa-logo.png"}
              />
            </button>
            <button onClick={()=>handleKhaltiPayment(borrowBookTitle)}>
              <Image
                width={100}
                height={100}
                objectFit="cover"
                alt="khalti logo"
                src={"/assets/khalti-logo.png"}
              />
            </button>
          </div>
      </Modal>

      {isLoading ? (
        <p className="text-xl bg-white h-96 flex items-center justify-center mt-8 rounded-2xl">
          <span>Loading...</span>
        </p>
      ) : (
        <div className="mt-8 rounded-3xl bg-white pb-2.5 px-2 pt-2 shadow-default sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full text-sm table-auto">
              <thead>
                <tr className="border-b-2 text-left">
                  <th className="py-4 px-2 font-medium text-black">S.N</th>
                  <th className="min-w-[120px] py-4 px-2 font-medium text-black">
                    Title
                  </th>
                  <th className="min-w-[120px] py-4 px-2 font-medium text-black">
                    Borrow Date
                  </th>
                  <th className="max-w-[120px] py-4 px-2 font-medium text-black">
                    Due Date
                  </th>
                  <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                    Status
                  </th>
                  <th className="min-w-[80px] py-4 px-2 font-medium text-black">
                    Overdue
                  </th>
                  <th className="max-w-[120px] py-4 px-2 font-medium text-black">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.results?.map(
                  (borrowList: Record<string, any>, index: number) => {
                    return (
                      <tr key={index}>
                        <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <h5 className="font-medium text-black">
                            {index + 1}
                          </h5>
                        </td>
                        <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            {borrowList?.book?.title}
                          </p>
                        </td>
                        <td className="max-w-[160px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black " id="card_title">
                            <DateToString
                              inputDate={borrowList?.borrowed_date}
                            />
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            <DateToString inputDate={borrowList?.due_date} />
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            {borrowList?.borrow_status}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black ml-4">
                            {borrowList?.overdue === false ? "❌" : "✅"}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p
                            className={`text-black ${
                              borrowList?.overdue === false ? "ml-3" : ""
                            }`}
                            id="card_title"
                          >
                            {borrowList?.overdue === false ? (
                              "---"
                            ) : (
                              <button
                                onClick={() => {handlePayment(borrowList?.id), 
                                  BookTitle(borrowList?.book?.title)}}
                                // onClick={()=>handleEsewaPayment(borrowList?.id)}
                                className="bg-blue-500 px-4 py-1 text-white rounded-md"
                              >
                                Pay
                              </button>
                            )}
                          </p>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
            {/* <div className="text-sm float-right m-4 flex items-center text-red-400 font-semibold">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <MdChevronLeft className="w-5 h-5" />
              </button>
              {paginationLinks}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <MdChevronRight className="w-5 h-5" />
              </button>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default BorrowHistory;
