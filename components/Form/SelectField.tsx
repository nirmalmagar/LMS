import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import FormLabel from "./FormLabel";
import { ChoiceType } from "@/helpers/TypeHelper";
import "../Layouts/Sidebar.css"

interface SelectFieldProps {
  className?: string;
  id?: string;
  label?: string;
  labelStyle?: string;
  labelWidth?: string;
  name: string;
  labelClassName?: string;
  placeholder?: string;
  defaultValue?: string | number | boolean;
  value?: string | number | boolean;
  required?: boolean;
  wrapperClassName?: string;
  options: { value: string | number; label: string }[];
  fieldErrors?: Array<string>;
  clearSelectValue?: Boolean;
  setClearSelectValue?: React.Dispatch<React.SetStateAction<boolean>>;
  isDisabled?: boolean;
  onChange?: (choice: ChoiceType) => void;
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
  placeholder,
  required,
  options,
  wrapperClassName = "",
  fieldErrors = [],
  clearSelectValue = false,
  setClearSelectValue,
  isDisabled,
  onChange,
  labelClassName,
}) => {
  if (labelStyle === "label-left") {
    wrapperClassName = wrapperClassName.concat(
      " ",
      " flex justify-between items-center gap-2 "
    );
  }
  const selectRef = useRef<any>(null);
  useEffect(() => {
    if (clearSelectValue === true) {
      selectRef?.current?.clearValue?.();
      setClearSelectValue && setClearSelectValue(false);
    }
  }, [clearSelectValue, setClearSelectValue]);
  const styles = {
    menuList: (base: any) => ({
      ...base,

      "::-webkit-scrollbar": {
        width: "5px",
      },
      "::-webkit-scrollbar-track": {
        background: "#f1f1f1",
      },
      "::-webkit-scrollbar-thumb": {
        background: "#d1d1d1",
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "#555",
      },
    }),
  };

  return (
    <div className={`${wrapperClassName} `}>
      {label && (
        <FormLabel id={id ?? name} labelWidth={labelWidth}>
          {label}
          {required ? <span className="text-error-400"> *</span> : ""}
        </FormLabel>
      )}

      <div className="w-full ">
        <Select
          ref={selectRef}
          defaultValue={options.find(
            (option) => option?.value === defaultValue
          )}
          value={options.find((option) => option?.value === value)}
          options={options}
          id={id ?? name}
          className={`w-full ${className}  custom-scrollbar font-normal`}
          isDisabled={isDisabled}
          onChange={onChange}
          styles={styles}
          placeholder={placeholder}
        />{" "}
        <span className="block text-error-500 text-xs my-1">
          {fieldErrors.map((item: string, index: any) => (
            <span key={index}>{item}</span>
          ))}
        </span>
      </div>
    </div>
  );
};

export default SelectField;
