import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import InviteForm from "../components/InviteForm";

const ProjectPage: React.FC = () => {
  const { projectName } = useParams<{ projectName: string }>();
  const location = useLocation();
  const projectDetails = location.state?.projectDetails || {
    projectName: "",
    projectDescription: "",
    invitedEmails: [],
  };
  const [invitedEmails, setInvitedEmails] = useState<string[]>([]);

  const handleInvite = (email: string) => {
    setInvitedEmails([...invitedEmails, email]);
  };

  return (
    <div className="flex justify-center items-center h-full py-10">
      <div className="max-w-md mx-auto bg-white rounded-md shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">{projectName}</h1>
          <p className="mb-4">{projectDetails.projectDescription}</p>
          <InviteForm onSubmit={handleInvite} />
        </div>
        <div className="bg-gray-100 py-4 px-6">
          <h2 className="text-lg font-semibold mb-4">Project Partners:</h2>
          <ul>
            {invitedEmails.map((email, index) => (
              <li key={index} className="text-gray-700 mb-2">
                {email}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
