import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

type ProjectDetails = {
  projectName: string;
  projectDescription: string;
  projectStartDate: string;
  projectEndDate: string;
  projectOwner: string;
  projectStatus: string;
  invitedEmails: string[];
  taskData: [];
};

const ProjectDetailsContext = createContext<ProjectDetails | undefined>(
  undefined
);

const ProjectCreationForm: React.FC<{}> = () => {
  const { user } = useAuth0();
  const [projectName, setProjectName] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [projectStartDate, setProjectStartDate] = useState<string>("");
  const [projectEndDate, setProjectEndDate] = useState<string>("");
  const [projectStatus, setProjectStatus] = useState<string>("");
  const navigate = useNavigate();

  const handleCreateProject = () => {
    const projectDetails: ProjectDetails = {
      projectName,
      projectDescription,
      projectStartDate,
      projectEndDate,
      projectOwner: user ? user.name : "", // Assuming Auth0 returns user ID as 'sub'
      projectStatus,
      invitedEmails: [],
      taskData: [],
    };

    localStorage.setItem(projectName, JSON.stringify(projectDetails));
    console.log("Project created:", projectDetails);
    navigate(`/project/${projectName}`, { state: { projectDetails } });
  };

  return (
    <ProjectDetailsContext.Provider value={undefined}>
      <div className="flex justify-center items-center h-full py-10">
        <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
          <h1 className="text-2xl font-semibold mb-4 text-center">
            Create a New Project
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            Fill out the form below to create a new project and start
            collaborating with your team!
          </p>
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
          <input
            type="date"
            value={projectStartDate}
            onChange={(e) => setProjectStartDate(e.target.value)}
            placeholder="Start Date"
            className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-400"
          />
          <input
            type="date"
            value={projectEndDate}
            onChange={(e) => setProjectEndDate(e.target.value)}
            placeholder="End Date"
            className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-400"
          />
          <input
            type="text"
            value={projectStatus}
            onChange={(e) => setProjectStatus(e.target.value)}
            placeholder="Project Status"
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
