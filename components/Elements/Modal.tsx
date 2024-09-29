import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface ModalProps {
  modalTitle?: string;
  show: boolean;
  handleClose: () => void;
  size?: "sm" | "lg" | "xl";
  modalType?: "normal" | "draw-from-right";
  children: React.ReactNode;
  icon?: any;
}

// const modalTypeClasses = {
//   standard: "bg-white-25 border border-gray-300 text-gray-700",
//   drawFromRight: "bg-primary-500 border border-primary-500 text-white",
//   drawFrom: "bg-error-500 border border-error-500 text-white",
//   warning: "bg-warning text-dark",
// };

export default function Modal({
  modalTitle = "Modal Title",
  show,
  handleClose,
  size,
  children,
  modalType,
  icon,
}: ModalProps) {
  const width =
    size === "sm"
      ? " max-w-md sm:w-[400px] sm:max-w-full"
      : size === "lg"
      ? " sm:w-[600px] w-full"
      : "max-w-sm sm:w-[700px] sm:max-w-full";
  // const height =
  //   size === "sm" ? "h-[400px]" : size === "lg" ? "h-[600px]" : "h-[900px]";
  const cancelButtonRef = useRef<HTMLDivElement>(null);

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={handleClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom={`${
                modalType === "draw-from-right"
                  ? " top:0 right-[-100%] "
                  : " translate-y-4 sm:translate-y-0 sm:scale-95 "
              } opacity-0  `}
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-300"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo={`${
                modalType === "draw-from-right"
                  ? " right-[-100%] "
                  : " translate-y-4 sm:translate-y-0 sm:scale-95 "
              } opacity-0  `}
            >
              <Dialog.Panel
                className={`${
                  modalType === "draw-from-right"
                    ? "top-0 bottom-0 right-0 fixed overflow-y-auto h-full"
                    : "relative rounded"
                } 
                    // dark:bg-black-500
                transform  bg-white  text-left shadow-xl transition-all h-fit ${width} py-5 md:py-8 px-3 md:px-8`}
              >
                {icon ? (
                  <div>
                    <div className="flex justify-center items-start border-gray-100">
                      <div></div>
                      <div>
                        <Image src={icon} alt="logo" width={48} height={48} />
                      </div>
                      <div
                        onClick={handleClose}
                        ref={cancelButtonRef}
                        className="cursor-pointer p-1 rounded-full bg-gray-200 hover:bg-gray-300 absolute right-8"
                      >
                        <XMarkIcon className="h-5 w-5 text-gray-600" />
                      </div>
                    </div>
                    <Dialog.Title
                      as="h3"
                      // dark:text-white
                      className="text-gray-900  text-center my-4 font-semibold leading-6 text-xl"
                    >
                      {modalTitle}
                    </Dialog.Title>
                  </div>
                ) : (
                  <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                    <Dialog.Title
                      as="h3"
                      // dark:text-white
                      className="text-gray-900  font-semibold leading-6 text-xl"
                    >
                      {modalTitle}
                    </Dialog.Title>

                    <div
                      onClick={handleClose}
                      ref={cancelButtonRef}
                      className="cursor-pointer p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                    >
                      <XMarkIcon className="h-5 w-5 text-gray-600" />
                    </div>
                  </div>
                )}

                <div className="mt-3 sm:mt-5">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
