import { useEffect, useRef, useState } from "react";

const OTPForm: React.FC<{
  numberOfDigits: number;
  onOtpChange: (value: string) => void;
}> = ({ numberOfDigits, onOtpChange }) => {
  const [otp, setOtp] = useState(new Array(numberOfDigits).fill(""));
  const otpBoxReference = useRef<any>([]);

  const handleChange = (value: string, index: number): void => {
    // Only proceed if the value is a digit or empty
    if (/^\d$/.test(value) || value === "") {
      let newArr = [...otp];
      newArr[index] = value;
      setOtp(newArr);

      if (value && index < numberOfDigits - 1) {
        otpBoxReference.current[index + 1].focus();
      }
      onOtpChange(newArr.join(""));
    }
  };

  const handleBackspaceAndEnter = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ): void => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      otpBoxReference.current[index - 1].focus();
    } else if (
      e.key === "Enter" &&
      e.currentTarget.value &&
      index < numberOfDigits - 1
    ) {
      otpBoxReference.current[index + 1].focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData("text/plain");
    const numbersOnly = pastedData.replace(/\D/g, "");
    const newArr = [...otp];
    for (let i = 0; i < Math.min(numbersOnly.length, numberOfDigits); i++) {
      newArr[i] = numbersOnly[i];
    }
    setOtp(newArr);
    onOtpChange(newArr.join(""));
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
        {otp.map((digit: string, index: number) => (
          <input
            key={index}
            value={digit}
            maxLength={1}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
            onPaste={(e) => handlePaste(e)}
            type="tel"
            pattern="\d*"
            ref={(reference) => (otpBoxReference.current[index] = reference)}
            className="border-2 w-10 h-10 md:w-12 md:h-12 text-center text-black p-2 rounded-md bg-slate-200 focus:bg-slate-300
                focus:border-4 focus:outline-none appearance-none"
            data-atttr={index}
          />
        ))}
      </div>
    </div>
  );
};

export default OTPForm;
