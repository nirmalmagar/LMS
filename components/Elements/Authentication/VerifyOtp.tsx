import Btn from "../Btn";
import OTPForm from "@/components/Form/OtpForm";
// import { formatZodErrors } from "@/helpers/zodHelper";
// import { InstructorDashboardRoutes } from "@/utils/instructorRoutes";
// import { StudentDashboardRoutes } from "@/utils/studentRoutes";
import { verifyOtpSchema } from "@/utils/zod/verifyOtp.schema";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { toast } from "react-toastify";

const VerifyOtp: React.FC<{
  setIsEmailValid: (value: boolean) => void;
  url: string;
  isStudent?: boolean;
}> = ({ setIsEmailValid, url, isStudent = true }) => {
  const [OtpValue, setOtpValue] = useState<string>("");
  const [isOtpValid, setIsOtpValid] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleOTPFormSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const toSendData = new FormData();
    toSendData.append("otp", OtpValue);
    try {
      const validationResult = verifyOtpSchema.safeParse({ otp: OtpValue });
      if (!validationResult?.success) {
        // const formattedError: any = formatZodErrors(validationResult?.error);
        setIsOtpValid(false);
        // setError(formattedError?.otp);
        return;
      }
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: toSendData,
      });
      const data = await response.json();
      if (data?.success) {
        toast.success(data?.message);
        // isStudent
        //   ? router.replace(
        //       StudentDashboardRoutes.VERIFY_TOKEN_ROUTES.concat(
        //         `/${data?.data?.token}`
        //       )
        //     )
        //   : router.replace(
        //       InstructorDashboardRoutes.VERIFY_TOKEN_ROUTES.concat(
        //         `/${data?.data?.token}`
        //       )
        //     );
      } else {
        toast.error(data?.message);
        setIsEmailValid(false);
      }
    } catch (error: any) {
      toast.error(error?.message);
      setIsEmailValid(false);
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
      <form onSubmit={handleOTPFormSubmit} className="mt-2">
        <div className="flex flex-col">
          <OTPForm numberOfDigits={6} onOtpChange={handleOtpChange} />
          <span className="text-red-500 text-[12px] text-right mt-4">
            {!isOtpValid && error}
          </span>

          <div className="flex flex-col items-center mt-4">
            <div className="bg-blue-600 rounded-lg mb-4">
              <Btn size="md" type="submit">Verify</Btn>
            </div>
            <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
              <p>Didn&apos;t receive code?</p>{" "}
              <button
                className="flex flex-row items-center font-semibold text-primary-600 hover:text-primary-500"
                onClick={() => {
                  setIsEmailValid(false);
                }}
              >
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
