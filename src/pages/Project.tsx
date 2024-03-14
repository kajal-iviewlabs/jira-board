import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import InviteForm from "../components/InviteForm";
import TaskModal from "../components/TaskModal";

interface TaskData {
  taskName: string;
  description: string;
  priority: string;
  assignee: string;
  duration: string;
}

const ProjectPage: React.FC = () => {
  const { projectName } = useParams<{ projectName: string }>();
  const location = useLocation();
  const projectDetails = location.state?.projectDetails || {
    projectName: "",
    projectDescription: "",
    invitedEmails: [],
    taskData: [],
  };
  const [invitedEmails, setInvitedEmails] = useState<string[]>([]);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskData, setTaskData] = useState<TaskData[]>([]);

  useEffect(() => {
    if (projectName) {
      const projectDetailsString = localStorage.getItem(projectName);
      if (projectDetailsString) {
        const projectDetails = JSON.parse(projectDetailsString);
        setInvitedEmails(projectDetails.invitedEmails || []);
        setTaskData(projectDetails.taskData || []);
      }
    }
  }, [projectName]);

  const handleInvite = (email: string) => {
    setInvitedEmails((prevInvitedEmails) => [...prevInvitedEmails, email]);

    if (projectName) {
      const projectDetailsString = localStorage.getItem(projectName);
      if (projectDetailsString) {
        const projectDetails = JSON.parse(projectDetailsString);
        const updatedProjectDetails = {
          ...projectDetails,
          invitedEmails: [...projectDetails.invitedEmails, email],
        };
        localStorage.setItem(
          projectName,
          JSON.stringify(updatedProjectDetails)
        );
      }
    }
  };

  const handleOpenTaskModal = () => {
    setIsTaskModalOpen(true);
  };

  const handleCloseTaskModal = () => {
    setIsTaskModalOpen(false);
  };

  const handleTaskSubmission = (newTaskData: TaskData) => {
    setTaskData((prevTaskData) => [...prevTaskData, newTaskData]);
    const updatedProjectDetails = {
      ...projectDetails,
      taskData: [...projectDetails.taskData, newTaskData],
    };
    if (projectName) {
      localStorage.setItem(projectName, JSON.stringify(updatedProjectDetails));
    } else {
      console.error("Project name is undefined.");
    }
  };

  return (
    <div className="flex justify-center items-center h-full py-10">
      <div className="max-w-md mx-auto bg-white rounded-md shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-10">
            <h1 className="text-2xl font-bold mb-4">{projectName}</h1>
            <button
              onClick={handleOpenTaskModal}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create Task
            </button>
          </div>
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
        <div className="bg-gray-100 py-4 px-6">
          <h2 className="text-lg font-semibold mb-4">Task Data:</h2>
          {taskData.map((task, index) => (
            <div key={index} className="bg-white shadow-md rounded-md p-4 mb-4">
              <p className="font-semibold">Task Name: {task.taskName}</p>
              <p>Description: {task.description}</p>
              <p>Priority: {task.priority}</p>
              <p>Assignee: {task.assignee}</p>
              <p>Duration: {task.duration}</p>
            </div>
          ))}
        </div>
      </div>
      {isTaskModalOpen && (
        <TaskModal
          onSubmitTask={handleTaskSubmission}
          onClose={handleCloseTaskModal}
          invitedEmails={invitedEmails}
        />
      )}
    </div>
  );
};

export default ProjectPage;
