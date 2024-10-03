import React, { ReactNode, HTMLProps, useEffect, useRef } from "react";
import classNames from "classnames";
import FormLabel from "./FormLabel";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export interface InputFieldProps {
  children?: ReactNode;
  readonly?: boolean;
  wrapperClassName?: string;
  id?: string;
  className?: string;
  label?: string;
  labelStyle?: "label-left" | "label-top";
  labelWidth?: String;
  labelClassName?: string;
  type?:
    | "textarea"
    | "text"
    | "file"
    | "email"
    | "tel"
    | "password"
    | "number"
    | "search"
    | "color"
    | "date"
    | "time"
    | "datetime-local";
  name?: string;
  status?: string;
  disabled?: boolean;
  value?: any;
  defaultValue?: any;
  formGroup?: string;
  hasIcon?: string;
  size?: string;
  placeholder?: string;
  rows?: number;
  hint?: string;
  required?: boolean;
  hidden?: boolean;
  fieldErrors?: Array<string>;
  helpText?: String;
  onChange?: (e: any) => void;
  step?: string;
  passwordField?: boolean;
  togglePasswordVisibility?: () => void;
  showPassword?: boolean;
  min?: string;
  max?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  className = "",
  id,
  wrapperClassName = "",
  autocomplete = true,
  children,
  label,
  labelStyle = "label-left",
  labelWidth,
  type,
  name,
  status,
  disabled,
  value,
  defaultValue,
  formGroup,
  hasIcon,
  size,
  placeholder,
  rows,
  hint,
  required,
  fieldErrors = [],
  helpText,
  readonly,
  hidden = false,
  onChange,
  passwordField,
  togglePasswordVisibility,
  showPassword,
  labelClassName,
  min,
  max,
  ...props
}) => {
  const Component = type === "textarea" ? "textarea" : "input";
  if (labelStyle === "label-left") {
    wrapperClassName = wrapperClassName.concat(
      " ",
      "flex gap-2 justify-between"
    );
  } else if (labelStyle === "label-top") {
    wrapperClassName = wrapperClassName.concat(
      " ",
      "flex gap-1 justify-between flex-col"
    );
  }
  return (
    <div className={`${wrapperClassName} flex`}>
      {label && (
        <FormLabel labelWidth={labelWidth} id={id} className={labelClassName}>
          {label}
          {required ? <span className="text-error-400"> *</span> : ""}
        </FormLabel>
      )}

      <div className="w-full relative">
        <Component
          {...props}
          type={type !== "textarea" ? type : undefined}
          className={`${
            hidden === false ? "block" : ""
          }  w-full rounded-md border-0 py-1.5 px-1.5 font-normal shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 relative ${className}`}
          name={name}
          id={id}
          disabled={disabled}
          defaultValue={defaultValue}
          value={value}
          placeholder={placeholder}
          min={min}
          max={max}
          // required={required}
          rows={type === "textarea" ? rows : undefined}
          hidden={hidden}
          onChange={onChange}
          readOnly={readonly}
        />
        {passwordField && (
          <span
            className="flex justify-around items-center cursor-pointer absolute right-2 top-[50%] translate-y-[-50%]"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <EyeIcon className="-mt-1.5 h-4" />
            ) : (
              <EyeSlashIcon className="-mt-1.5 h-4" />
            )}
          </span>
        )}

        {children}
        {helpText && (
          <div className=" text-gray-800 text-xs mt-1">{helpText}</div>
        )}
        {labelStyle === "label-left" && (
          <span className=" text-error-500 text-xs my-1">
            {fieldErrors.map((item: string, index: any) => (
              <span key={index}>
                {item}
                <br></br>
              </span>
            ))}
          </span>
        )}
        {/* {hint && <FormHint status={status}>{hint}</FormHint>} */}
      </div>
      {labelStyle !== "label-left" && (
        <span className=" text-error-500 text-xs">
          {fieldErrors.map((item: string, index: any) => (
            <span key={index}>
              {item}
              <br></br>
            </span>
          ))}
        </span>
      )}
    </div>
  );
};

export default InputField;
