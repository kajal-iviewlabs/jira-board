import React, { useState } from "react";
import { useParams } from "react-router-dom";

interface InviteFormProps {
  onSubmit: (email: string) => void;
}

const InviteForm: React.FC<InviteFormProps> = ({ onSubmit }) => {
  const { projectName } = useParams<{ projectName: string | undefined }>();
  const [email, setEmail] = useState<string>("");

  const handleInvite = () => {
    if (!projectName) {
      return;
    }

    onSubmit(email);

    const projectDetailsString = localStorage.getItem(projectName);
    if (!projectDetailsString) {
      console.error("Project details not found in local storage.");
      return;
    }

    const projectDetails = JSON.parse(projectDetailsString);

    const updatedProjectDetails = {
      ...projectDetails,
      invitedEmails: [...projectDetails.invitedEmails, email],
    };

    localStorage.setItem(projectName, JSON.stringify(updatedProjectDetails));

    setEmail("");
  };

  return (
    <div className="flex flex-col space-y-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email address"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
      />
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
