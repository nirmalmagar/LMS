import Btn from "../Btn";
import OTPForm from "@/components/Form/OtpForm";
import { useState, FormEvent } from "react";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";  

const VerifyOtp: React.FC<{
}> = () => {
  const [OtpValue, setOtpValue] = useState<string>("");
  const [isOtpValid, setIsOtpValid] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const query = searchParams.get('email');

  console.log("otp value", OtpValue, query)
  const handleOTPFormSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const toSendData = new FormData();
    toSendData.append("otp", OtpValue);
    try {
      const response = await fetch(`${process.env.HOST}verify-email/?email=${query}`, {
        method: "POST",
        body: toSendData,
        headers: {
          Accept: "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("successsss");
      } else {
        toast.error("errorr");
      }
    } catch (error: any) {
      toast.error(error);
    }
  };

  const handleOtpChange = (value: string): void => {
    setOtpValue(value);
    setIsOtpValid(true);
  };
  return (
    <>
      <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-600 md:text-2xl  text-center">
        Verify OTP
      </h2>
      <form className="mt-2">
        <div className="flex flex-col">
          <OTPForm numberOfDigits={6} onOtpChange={handleOtpChange} />
          {/* <span className="text-red-500 text-[12px] text-right mt-4">
            {!isOtpValid }
          </span> */}

          <div className="flex flex-col items-center mt-4">
            <div className="bg-blue-600 rounded-lg mb-4">
              <Btn onClick={()=>handleOTPFormSubmit} size="md" type="submit">Verify</Btn>
            </div>
            <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
              <p>Didn&apos;t receive code?</p>{" "}
              <button
                className="flex flex-row items-center font-semibold text-primary-600 hover:text-primary-500">
                Resend
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default VerifyOtp;
