import React from "react";

interface InputFormProps {
  className?: string;
  placeholder?: string;
  name?: string;
  id?:string;
  type?:
    | "textarea"
    | "radio"
    | "email"
    | "number"
    | "password"
    | "text"
    | "datetime-local"
    | "time"
    | "search"
    | "tel"
    | "color";
}

const InputForm:React.FC<InputFormProps> = ({
  className="",
  placeholder = "",
  name,
  type,
  ...props
}) => {
  return (
    <>
      <input type={type} placeholder={placeholder} />
    </>
  );
};

export default InputForm;
