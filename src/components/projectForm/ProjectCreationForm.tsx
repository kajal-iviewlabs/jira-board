import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { createProject } from "../../store/actions";
import { TaskData } from "../../pages/Project";

export type ProjectDetails = {
  projectName: string;
  projectDescription: string;
  projectStartDate: string;
  projectEndDate: string;
  projectOwner: string;
  projectStatus: string;
  invitedEmails: string[];
  taskData: TaskData[];
  inProgressData?: TaskData[];
  doneData?: TaskData[];
};

const ProjectCreationForm: React.FC<{}> = () => {
  const { user } = useAuth0();
  const [projectName, setProjectName] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [projectStartDate, setProjectStartDate] = useState<string>("");
  const [projectEndDate, setProjectEndDate] = useState<string>("");
  const [projectStatus, setProjectStatus] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCreateProject = async () => {
    const projectOwner: string = user?.name || "";

    const projectDetails: ProjectDetails = {
      projectName,
      projectDescription,
      projectStartDate,
      projectEndDate,
      projectOwner,
      projectStatus,
      invitedEmails: [projectOwner],
      taskData: [],
      inProgressData: [],
      doneData: [],
    };

    try {
      const resp = await fetch(
        `https://project-management-tool-2dcae-default-rtdb.firebaseio.com/${user?.name}.json`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(projectDetails),
        }
      );

      if (resp.ok) {
        alert("Data stored successfully");
      } else {
        alert("Error storing data");
      }

      dispatch(createProject(projectDetails));

      navigate(`/project/${projectName}`, { state: { projectDetails } });
    } catch (error) {
      console.error("Error storing project details:", error);
      alert("An error occurred while storing project details");
    }
  };

  return (
    <div className="flex justify-center items-center h-full py-10">
      <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
        <h1 className="text-2xl text-blue-900 font-semibold mb-4 text-center">
          Create a New Project
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Fill out the form below to create a new project and start
          collaborating with your team!
        </p>
        <label className="text-blue-900">Project Title</label>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Project Name"
          className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        <label className="text-blue-900">Project Description</label>
        <textarea
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          placeholder="Project Description"
          className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        <label className="text-blue-900">Start Date</label>
        <input
          type="date"
          value={projectStartDate}
          onChange={(e) => setProjectStartDate(e.target.value)}
          placeholder="Start Date"
          className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-400"
        />
        <label className="text-blue-900">End Date</label>
        <input
          type="date"
          value={projectEndDate}
          onChange={(e) => setProjectEndDate(e.target.value)}
          placeholder="End Date"
          className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-400"
        />
        <label className="text-blue-900">Project Status</label>
        <select
          value={projectStatus}
          onChange={(e) => setProjectStatus(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="active">Active</option>
          <option value="progress">In Progress</option>
          <option value="complete">Complete</option>
        </select>

        <button
          onClick={handleCreateProject}
          className="w-full px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
        >
          Create Project
        </button>
      </div>
    </div>
  );
};

export default ProjectCreationForm;
