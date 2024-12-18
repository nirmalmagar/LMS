import React, { useRef, useEffect, forwardRef } from "react";

interface OTPInputPropsInterface {
  onChange?: (value: number | undefined) => void;
  value: number | undefined;
  focusNext?: () => void;
}

const OTPInput = forwardRef<HTMLInputElement, OTPInputPropsInterface>(
  ({ onChange, value, focusNext }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      if (/^[0-9]?$/.test(newValue)) {
        onChange?.(newValue === "" ? undefined : parseInt(newValue, 10));

        if (newValue !== "" && focusNext) {
          focusNext();
        }
      }
    };

    useEffect(() => {
      if (inputRef.current && value === undefined) {
        inputRef.current.focus();
      }
    }, [value]);

    return (
      <input
        ref={ref || inputRef}
        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none 
          rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 
          focus:ring-1 ring-primary-500"
        type="tel"
        onChange={handleInputChange}
        value={value !== undefined ? value : ""}
        maxLength={1}
        pattern="[0-9]{1}"
      />
    );
  }
);

OTPInput.displayName = "OTPInput";
export default OTPInput;
