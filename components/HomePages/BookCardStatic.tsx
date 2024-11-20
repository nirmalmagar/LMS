"use client";
import React, { FormEvent, useEffect, useState } from "react";
import Container from "../Container";
import Image from "next/image";
import Modal from "../Elements/Modal";
import { BookListProps } from "@/interfaces/book_list.interface";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { routes } from "@/utils/routes";
import { toast } from "react-toastify";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Btn from "../Btn";
import Spinner from "../Spinner/Spinner";
import Link from "next/link";

interface ListBookObject {
  booksUrl: BookListProps[];
}

const BookCardStatic: React.FC<ListBookObject> = ({ booksUrl }) => {
  const route = useRouter();
  const [displayModal, setDisplayModal] = useState<boolean>(false);
  const [hidePassword, setHidePassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputFormValue, setInputFormValue] = useState({
    email: "",
    password: "",
  });

  const LoginURL = `${process.env.HOST}token/`;
  const changeHandler = (key: string, value: string): void => {
    setInputFormValue((inputValue) => ({ ...inputValue, [key]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    const LoginData = {
      email: inputFormValue.email,
      password: inputFormValue.password,
    };
    try {
      const response = await fetch(LoginURL, {
        method: "POST",
        body: JSON.stringify(LoginData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (response.ok) {
        const data = result;
        Cookie.set("LOGIN_TOKEN", data?.token?.access);
        route.push(routes.BOOK_LIST);
        toast.success("login successfully");
      } else {
        toast.error("something went wrong!!");
        Cookie.remove("LOGIN_TOKEN");
      }
    } catch (error) {
      toast.error(" connect fail");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Container>
        <Modal
          show={displayModal}
          handleClose={() => setDisplayModal(false)}
          modalTitle="Add Account"
          size="lg"
        >
          <div className="ml-8">
            <div
              className={` px-8 py-8 bg-white w-[30rem] shadow-md rounded-xl`}
            >
              <div className="text-lg mb-2 font-semibold text-center">
                <span>Login your Account</span>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col">
                  <label className="mb-2 font-semibold mr-4" htmlFor="email">
                    Email:
                  </label>
                  <input
                    className="text-lg border-[1.5px] rounded-md shadow-sm border-gray-300 py-1.5 px-2 focus:outline-none focus:shadow-outline"
                    id="email"
                    name="email"
                    value={inputFormValue?.email}
                    onChange={(e: any) =>
                      changeHandler("email", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="flex flex-col mt-4 relative">
                  <label
                    className=" mb-2 font-semibold mr-4"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="text-lg border-[1.5px] rounded-md shadow-sm border-gray-300 py-1.5 pl-2 pr-12 focus:outline-none"
                    id="password"
                    name="password"
                    type={`${hidePassword ? "text" : "password"}`}
                    value={inputFormValue?.password}
                    onChange={(e: any) => {
                      changeHandler("password", e.target.value);
                    }}
                  />
                  <div
                    className="w-4 h-4 absolute cursor-pointer top-[46px] right-4"
                    onClick={() => setHidePassword(!hidePassword)}
                  >
                    {hidePassword ? <EyeIcon /> : <EyeSlashIcon />}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-center">
                  <Btn
                    className="w-1/2 bg-blue-400"
                    type={"submit"}
                    disabled={isLoading}
                  >
                    {isLoading ? <Spinner /> : "Login"}
                  </Btn>
                </div>
                <div className="text-sm tex-md mt-4">
                  Not a member ?{" "}
                  <Link
                    href={routes.ADMIN_AUTH_SIGN_UP}
                    className="text-blue-500"
                  >
                    Create an Account
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </Modal>
        <section className="my-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-items-center gap-y-12 gap-x-12">
            {booksUrl?.map((value: any, index: number) => {
              return (
                <div key={index} className="">
                  <div className="shadow-md hover:shadow-xl hover:scale-105 hover:duration-500">
                    <div className="relative w-60 h-72 mb-2">
                      <Image fill src={value?.cover} alt="cover image" />
                    </div>
                    <div className="pl-4 pb-4">
                      <h3 className="font-semibold" id="card_title">{value?.title}</h3>
                      <div className="flex gap-x-0.5">
                        <span className="font-semibold">by:</span>
                        <p>{value?.publisher}</p>
                      </div>
                      <div className="flex gap-x-0.5 font-semibold text-lg">
                        <p className="">Rs:</p>
                        <span>{value?.price}</span>
                      </div>
                    </div>
                  </div>
                  {/* <div className="my-2 py-1 border-2 border-blue-400 text-center rounded-sm hover:bg-blue-400 font-semibold hover:text-white">
                    ADD TO CART
                  </div> */}
                </div>
              );
            })}
          </div>
          <button
            onClick={() => setDisplayModal(!displayModal)}
            className="w-full text-center mt-4 text-md"
          >
            View All
          </button>
        </section>
      </Container>
    </>
  );
};

export default BookCardStatic;
