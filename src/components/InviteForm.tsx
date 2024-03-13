import React, { useContext, useState } from "react";
import ProjectDetailsContext from "./ProjectCreationForm";
interface InviteFormProps {
  onSubmit: (email: string) => void;
}

const InviteForm: React.FC<InviteFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState<string>("");
  const projectDetails = useContext(ProjectDetailsContext);

  console.log(projectDetails);

  const handleInvite = () => {
    onSubmit(email);

    if (projectDetails) {
      // Save invited email for the specific project in local storage
      const existingEmails = projectDetails.invitedEmails || [];
      const updatedEmails = [...existingEmails, email];
      localStorage.setItem(
        projectDetails.projectName,
        JSON.stringify(updatedEmails)
      );
    }

    setEmail("");
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email address"
      />
      <button onClick={handleInvite}>Invite</button>
    </div>
  );
};

export default InviteForm;
