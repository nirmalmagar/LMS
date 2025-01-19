// "use client";
// import React from "react";
// import Modal from "@/components/Elements/Modal";
// import TableHead from "@/components/Elements/TableHead/TableHead";
// import { useState, FormEvent } from "react";
// import InputField from "@/components/Form/InputForm";
// import Btn from "@/components/Btn";
// import { accessToken } from "@/helpers/TokenHelper";
// import { toast } from "react-toastify";

// const AddGenre = () => {
//   const [showPopUpModal, setShowPopUpModal] = useState<boolean>(false);
//   const [inputFieldValue, setInputFieldValue] = useState<Record<string, any>>(
//     {}
//   );

//   // input field
//   const handleFieldChange = (key: string, value: string): void => {
//     if (key && value) {
//       setInputFieldValue((prev) => ({ ...prev, [key]: value }));
//     }
//   };

//   // book add button
//   const handleAddBooks = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const InputFileData = {
//       name: inputFieldValue?.name,
//     };
//     try {
//       const response = await fetch(`${process.env.HOST}genres/`, {
//         method: "POST",
//         body: JSON.stringify(InputFileData),
//         headers: {
//           Authorization: `Bearer ${accessToken()}`,
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//       });
//       const data = await response.json();
//       if (response.ok) {
//         toast.success(data?.message);
//         toast.success("hello nirmal");
//         setInputFieldValue({});
//         setShowPopUpModal(false);
//       } else {
//         toast.error("some error on field");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <>
//       <TableHead
//         className="px-2 py-4"
//         size="small"
//         tableName="Genres List"
//         addTitle="Add Genres"
//         onClick={() => setShowPopUpModal(true)}
//       />
//       <Modal
//         show={showPopUpModal}
//         handleClose={() => setShowPopUpModal(false)}
//         modalTitle="Add Books"
//         size="lg"
//       >
//         <form id="lead-form" onSubmit={handleAddBooks}>
//           <div className=" px-4 py-4 rounded-lg border border-gray-200">
//             <InputField
//               // labelClassName="text-black"
//               // className="flex flex-col"
//               label="name"
//               name="name"
//               type="text"
//               defaultValue={inputFieldValue?.name}
//               onChange={(e: any) => {
//                 handleFieldChange("name", e.targe.value);
//               }}
//             />
//           </div>

//           <div className="bg-white sticky left-4 bottom-0 right-4 pt-6 border-gray-200 flex items-end  justify-between">
//             <Btn
//               outline="error"
//               onClick={() => {
//                 setShowPopUpModal(false);
//                 // setClearSelectValue(true);
//               }}
//             >
//               Cancel
//             </Btn>

//             <div className="flex gap-x-4">
//               <Btn type="submit" className="bg-blue-600 text-white">
//                 Submit
//               </Btn>
//             </div>
//           </div>
//         </form>
//       </Modal>
//     </>
//   );
// };

// export default AddGenre;
"use client";
import React from "react";
import Modal from "@/components/Elements/Modal";
import TableHead from "@/components/Elements/TableHead/TableHead";
import { useState, FormEvent } from "react";
import InputField from "@/components/Form/InputForm";
import Btn from "@/components/Btn";
import { accessToken } from "@/helpers/TokenHelper";
import { toast } from "react-toastify";

const AddGenre = () => {
  const [showPopUpModal, setShowPopUpModal] = useState<boolean>(false);
  const [inputFieldValue, setInputFieldValue] = useState<
    Record<string, string>
  >({});

  const handleFieldChange = (key: string, value: string): void => {
    if (key && value) {
      setInputFieldValue((prev) => ({ ...prev, [key]: value }));
    }
  };
  const handleCloseTap = () => {
    setShowPopUpModal(false);
    setInputFieldValue({});
  };
  // book add button
  const handleAddGenres = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const InputFileData = {
      name: inputFieldValue?.name,
    };
    try {
      const response = await fetch(`${process.env.HOST}genres/`, {
        method: "POST",
        body: JSON.stringify(InputFileData),
        headers: {
          Authorization: `Bearer ${accessToken()}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("data successfully insert");
        setShowPopUpModal(false);
      } else {
        toast.error("some error on field");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setInputFieldValue({});
    }
  };
  return (
    <>
      <TableHead
        className="px-2 py-4"
        size="small"
        tableName="Genres List"
        addTitle="Add Genres"
        onClick={() => setShowPopUpModal(true)}
      />
      <Modal
        show={showPopUpModal}
        handleClose={handleCloseTap}
        modalTitle="Add Genres"
        size="lg"
      >
        <form id="lead-form" onSubmit={handleAddGenres}>
          <div className=" px-4 py-4 rounded-lg border border-gray-200">
            <InputField
              type="text"
              label="Genres"
              name="name"
              placeholder="enter grade"
              defaultValue={inputFieldValue?.name}
              onChange={(e: any) => handleFieldChange("name", e.target.value)}
            />
          </div>

          <div className="bg-white sticky left-4 bottom-0 right-4 pt-6 border-gray-200 flex items-end  justify-between">
            <Btn
              outline="error"
              onClick={() => {
                setShowPopUpModal(false);
                setInputFieldValue({});
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

export default AddGenre;
