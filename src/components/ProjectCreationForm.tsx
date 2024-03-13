import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

type ProjectDetails = {
  projectName: string;
  projectDescription: string;
  invitedEmails: string[];
};

const ProjectDetailsContext = createContext<ProjectDetails | undefined>(
  undefined
);

const ProjectCreationForm: React.FC<{}> = () => {
  const [projectName, setProjectName] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [projectDetails, setProjectDetails] = useState<
    ProjectDetails | undefined
  >({
    projectName: "", // Set initial values
    projectDescription: "",
    invitedEmails: [],
  });
  const navigate = useNavigate();

  console.log(projectDetails);

  const handleCreateProject = () => {
    const projectDetails: ProjectDetails = {
      projectName,
      projectDescription,
      invitedEmails: [], // Initialize empty array for invited emails
    };

    // Store project details in local storage
    localStorage.setItem(projectName, JSON.stringify(projectDetails));
    setProjectDetails(projectDetails);

    console.log("Project created:", projectName, projectDescription);
    navigate(`/project/${projectName}`);
  };

  return (
    <ProjectDetailsContext.Provider value={projectDetails}>
      <div className="flex justify-center items-center h-full py-10">
        <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Project Name"
            className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
          <textarea
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            placeholder="Project Description"
            className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleCreateProject}
            className="w-full px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
          >
            Create Project
          </button>
        </div>
      </div>
    </ProjectDetailsContext.Provider>
  );
};

export default ProjectCreationForm;
