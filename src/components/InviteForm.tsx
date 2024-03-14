import React, { useState } from "react";
import { useParams } from "react-router-dom";

interface InviteFormProps {
  onSubmit: (email: string) => void;
}

const InviteForm: React.FC<InviteFormProps> = ({ onSubmit }) => {
  const { projectName } = useParams<{ projectName: string | undefined }>();
  const [email, setEmail] = useState<string>("");
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);

  const handleInvite = () => {
    if (!projectName || !isValidEmail) {
      return;
    }

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
    <div className="flex flex-col space-y-4">
      <input
        type="email"
        value={email}
        onChange={handleChange}
        placeholder="Enter email address"
        className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
          isValidEmail ? "border-gray-300" : "border-red-500"
        }`}
        required
      />
      {!isValidEmail && (
        <p className="text-red-500 text-sm">
          Please enter a valid email address
        </p>
      )}
      <button
        onClick={handleInvite}
        className="w-full px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
      >
        Invite
      </button>
    </div>
  );
};

export default InviteForm;
