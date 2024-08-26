import React, { ReactNode } from "react";
import { Lora } from "next/font/google";

const lora = Lora({subsets:["latin"]
})
interface LabelType {
  className?: string;
  htmlFor?: string;
  children?: ReactNode;
}

const Label: React.FC<LabelType> = ({ className = "", htmlFor, children }) => {
  return (
    <>
      <label className={`${lora.className}${className}`} htmlFor={htmlFor}>
        {children}
      </label>
    </>
  );
};
export default Label;
