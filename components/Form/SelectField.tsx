// import React, { useEffect, useRef, useState } from "react";
// import Select from "react-select";
// import FormLabel from "./FormLabel";
// import { ChoiceType } from "@/helpers/TypeHelper";
// import "../Layouts/Sidebar.css"

// interface SelectFieldProps {
//   className?: string;
//   id?: string;
//   label?: string;
//   labelStyle?: string;
//   labelWidth?: string;
//   name: string;
//   labelClassName?: string;
//   placeholder?: string;
//   defaultValue?: string | number | boolean;
//   value?: string | number | boolean;
//   required?: boolean;
//   wrapperClassName?: string;
//   options: { value: string | number; label: string }[];
//   fieldErrors?: Array<string>;
//   clearSelectValue?: Boolean;
//   setClearSelectValue?: React.Dispatch<React.SetStateAction<boolean>>;
//   isDisabled?: boolean;
//   onChange?: (choice: ChoiceType) => void;
// }

// const SelectField: React.FC<SelectFieldProps> = ({
//   className = "",
//   id,
//   label,
//   labelStyle,
//   labelWidth,
//   name,
//   defaultValue,
//   value,
//   placeholder,
//   required,
//   options,
//   wrapperClassName = "",
//   fieldErrors = [],
//   clearSelectValue = false,
//   setClearSelectValue,
//   isDisabled,
//   onChange,
//   labelClassName,
// }) => {
//   if (labelStyle === "label-left") {
//     wrapperClassName = wrapperClassName.concat(
//       " ",
//       " flex justify-between items-center gap-2 "
//     );
//   }
//   const selectRef = useRef<any>(null);
//   useEffect(() => {
//     if (clearSelectValue === true) {
//       selectRef?.current?.clearValue?.();
//       setClearSelectValue && setClearSelectValue(false);
//     }
//   }, [clearSelectValue, setClearSelectValue]);
//   const styles = {
//     menuList: (base: any) => ({
//       ...base,

//       "::-webkit-scrollbar": {
//         width: "5px",
//       },
//       "::-webkit-scrollbar-track": {
//         background: "#f1f1f1",
//       },
//       "::-webkit-scrollbar-thumb": {
//         background: "#d1d1d1",
//       },
//       "::-webkit-scrollbar-thumb:hover": {
//         background: "#555",
//       },
//     }),
//   };

//   return (
//     <div className={`${wrapperClassName} `}>
//       {label && (
//         <FormLabel id={id ?? name} labelWidth={labelWidth}>
//           {label}
//           {required ? <span className="text-error-400"> *</span> : ""}
//         </FormLabel>
//       )}

//       <div className="w-full ">
//         <Select
//           ref={selectRef}
//           defaultValue={options.find(
//             (option) => option?.value === defaultValue
//           )}
//           value={options.find((option) => option?.value === value)}
//           options={options}
//           id={id ?? name}
//           className={`w-full ${className}  custom-scrollbar font-normal`}
//           isDisabled={isDisabled}
//           onChange={onChange}
//           styles={styles}
//           placeholder={placeholder}
//         />{" "}
//         <span className="block text-error-500 text-xs my-1">
//           {fieldErrors.map((item: string, index: any) => (
//             <span key={index}>{item}</span>
//           ))}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default SelectField;



"use client";
import React, { useState } from "react";
interface SelectFieldProps {
  className?: string;
  id?: string;
  label?: string;
  labelStyle?: string;
  labelWidth?: string;
  name?: string;
  defaultValue?: string | number | boolean;
  value?: string | number | boolean;
  required?: boolean;
  wrapperClassName?: string;
  options: { value: string | number; label: string }[];
  fieldErrors?: Array<string>;
  clearSelectValue?: Boolean;
  setClearSelectValue?: React.Dispatch<React.SetStateAction<boolean>>;
  isDisabled?: Boolean;
  onChange?: (choice: Record<string, any>) => void;
}
const SelectField: React.FC<SelectFieldProps> = ({
  className = "",
  id,
  label,
  labelStyle,
  labelWidth,
  name,
  defaultValue,
  value,
  required,
  options,
  wrapperClassName = "",
  fieldErrors = [],
  clearSelectValue = false,
  setClearSelectValue,
  isDisabled,
  onChange,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  return (
    <div className="mb-4.5 flex my-1">
      <label className="mb-2.5 block w-[200px] text-black dark:text-white">
        {" "}
        {label}
      </label>

      <div className="relative w-full z-20 bg-transparent dark:bg-form-input">
        <select
          value={value ? value : defaultValue}
          onChange={onChange}
          defaultValue={"2"}
          name={name}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-2 py-1 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
            isOptionSelected ? "text-black dark:text-white" : ""
          }`}
        >
          <option value="" className="text-body dark:text-bodydark">
            Select...
          </option>
          {options?.map((option, index) => (
            <option
              key={index}
              value={option.value}
              className="text-body dark:text-bodydark"
            >
              {option.label}
            </option>
          ))}
        </select>
        <span className="block text-red-500 text-xs my-1">
          {fieldErrors.map((item: string, index: any) => (
            <span key={index}>{item}</span>
          ))}
        </span>
        <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
          <svg
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                fill=""
              ></path>
            </g>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default SelectField;
