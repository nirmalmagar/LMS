"use client";
import { useSearchParams } from "next/navigation";
import { useState, useRef, FormEvent } from "react";
import { toast } from "react-toastify";
import Btn from "@/components/Btn";

const OtpPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("email");

  const length = 6; // OTP length
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const [error, setError] = useState<Record<string, any>>({});
  const inputRefs = useRef<(HTMLInputElement | null)[]>(
    new Array(length).fill(null)
  );

  const OtpValue = otp.join("");
  const handleOTPFormSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const toSendData = new FormData();
    toSendData.append("otp", OtpValue);
    try {
      const response = await fetch(
        `${process.env.HOST}verify-email/?email=${query}`,
        {
          method: "POST",
          body: toSendData,
          headers: {
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success("Create Account Successfully");
        setError({});
      } else {
        setError(data);
        toast.error(data?.error);
      }
    } catch (error: any) {
      toast.error(error);
    }
  };

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    if (!/^[0-9]?$/.test(value)) return; // Allow only numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = event.clipboardData.getData("text").slice(0, length);
    if (/^\d+$/.test(pastedData)) {
      const otpArray = pastedData.split("").slice(0, length);
      setOtp(otpArray);
      otpArray.forEach((_, i) => inputRefs.current[i]?.focus());
    }
    event.preventDefault();
  };

  return (
    <form action="" onSubmit={handleOTPFormSubmit}>
      <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-600 md:text-2xl  text-center">
        Verify OTP
      </h2>
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              value={digit}
              maxLength={1}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="border-2 w-10 h-10 md:w-12 md:h-12 text-center text-black p-2 rounded-md bg-slate-200 focus:bg-slate-300
                focus:border-4 focus:outline-none appearance-none"
            />
          ))}
        </div>
          <p className="text-center text-sm text-red-600">{error?.otp ?? []}</p>
        <div className="flex flex-col items-center mt-4">
          <div className="bg-blue-600 rounded-lg mb-4">
            <Btn size="md" type="submit">
              Verify
            </Btn>
          </div>
          <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
            <p>Didn&apos;t receive code?</p>{" "}
            <button className="flex flex-row items-center font-semibold text-primary-600 hover:text-primary-500">
              Resend
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default OtpPage;
