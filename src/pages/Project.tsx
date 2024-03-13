// ProjectPage.tsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import InviteForm from "../components/InviteForm";

const ProjectPage: React.FC = () => {
  const { projectName } = useParams<{ projectName: string }>();
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [invitedEmails, setInvitedEmails] = useState<string[]>([]);

  const handleInvite = (email: string) => {
    setInvitedEmails([...invitedEmails, email]);
    localStorage.setItem("invitedEmails", JSON.stringify(invitedEmails));
  };

  return (
    <div className="flex justify-center items-center h-full py-10">
      <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4">{projectName}</h1>
        <textarea
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          placeholder="Project Description"
          className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        <InviteForm onSubmit={handleInvite} />
        <div>
          Invited emails:
          <ul>
            {invitedEmails.map((email, index) => (
              <li key={index}>{email}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
