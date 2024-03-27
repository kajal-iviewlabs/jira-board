import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface InviteFormProps {
  onSubmit: (email: string) => void;
}

const InviteForm: React.FC<InviteFormProps> = ({ onSubmit }) => {
  const { projectName } = useParams<{ projectName: string | undefined }>();
  const [email, setEmail] = useState<string>("");
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);

  const handleInvite = () => {
    if (!email.trim()) {
      toast.error("Please enter an email address", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    if (!projectName || !isValidEmail) {
      return;
    }

    toast.success(`${email} invited`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    onSubmit(email);
    setEmail("");
    setIsValidEmail(true);
  };

  const validateEmail = (email: string): boolean => {
    // Regular expression for validating email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
    setIsValidEmail(validateEmail(value));
  };

  return (
    <div className="flex flex-row mt-6 items-center">
      <input
        type="email"
        value={email}
        onChange={handleChange}
        placeholder="Invite people"
        className={`flex-grow px-4 py-2 mr-4 border border-gray-100 hover:border-blue-900 rounded-md focus:outline-none ${
          isValidEmail ? "border-gray-100" : "border-red-600"
        }`}
        required
      />
      {!isValidEmail && (
        <p className="text-red-500 mr-4 text-sm">
          Please enter a valid email address
        </p>
      )}
      <button
        onClick={handleInvite}
        className="font-bold py-2 px-10 bg-blue-900 text-gray-100 text-white rounded-md hover:bg-gray-100 hover:text-blue-900 hover:border border-blue-900 focus:outline-none"
      >
        Invite
      </button>
      <ToastContainer />
    </div>
  );
};

export default InviteForm;
