import React, { FormEvent, useState } from "react";
import Modal from "@/components/Elements/Modal";
import InputField from "@/components/Form/InputForm";
import Btn from "@/components/Btn";
import { accessToken } from "@/helpers/TokenHelper";
import { toast } from "react-toastify";
import { LockClosedIcon } from "@heroicons/react/24/outline";

interface getUserId {
  userId: number;
}
const ChangePassword: React.FC<getUserId> = ({ userId }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [inputFormValues, setInputFormValues] = useState<Record<string, any>>(
    {}
  );
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [error, setError] = useState<Record<string, any>>({});
  // handle close password modal
  const handleClosePasswordTap = () => {
    setShowPasswordModal(false);
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword((prev) => !prev);
  };

  const handleFieldChange = (key: string, value: string): void => {
    setInputFormValues((prev) => ({ ...prev, [key]: value }));
  };


  // change password handle
  const handleChangePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      new_password: inputFormValues?.new_password,
    };
    try {
      const response = await fetch(
        `${process.env.HOST}user/${userId}/change-password/`,
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            Authorization: `Bearer ${accessToken()}`,
            Accept: "application/json",
            "Content-Type": 'application/json'
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success("Password Change Successfully ");
        setShowPasswordModal(false);
      } else {
        setError(data);
      }
    } catch (e: any) {
      console.error(e);
    }
  };

  return (
    <>
      {/* change password popup model */}
      <Modal
        show={showPasswordModal}
        handleClose={handleClosePasswordTap}
        modalTitle="Change Password"
        size="lg"
      >
        <form id="lead-form" onSubmit={handleChangePassword}>
          <div className=" px-4 py-4 rounded-lg border border-gray-200">
            <InputField
              type={showPassword ? "text" : "password"}
              label="New Password"
              name="new_password"
              placeholder="enter password"
              fieldErrors={error?.new_password ?? []}
              passwordField={true}
              togglePasswordVisibility={togglePasswordVisibility}
              showPassword={showPassword}
              onChange={(e: any) => {
                handleFieldChange("new_password", e.target.value);
              }}
            />
          </div>
          <div className="bg-white sticky left-4 bottom-0 right-4 pt-6 border-gray-200 flex items-end  justify-between">
            <Btn outline="error" onClick={handleClosePasswordTap}>
              Cancel
            </Btn>

            <div className="flex gap-x-4">
              <Btn type="submit" className="bg-blue-600 text-white">
                Change
              </Btn>
            </div>
          </div>
        </form>
      </Modal>
      <button className="ml-3" onClick={() => setShowPasswordModal(true)}>
        <LockClosedIcon className="h-[18px] w-[18px] hover:text-blue-700" />
      </button>
    </>
  );
};

export default ChangePassword;
