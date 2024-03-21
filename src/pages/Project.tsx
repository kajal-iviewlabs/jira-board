import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import InviteForm from "../components/invitePeople/InviteForm";
import TaskModal from "../components/projectForm/TaskModal";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { FaExclamationCircle, FaRegCircle, FaCircle } from "react-icons/fa";
import { database } from "../firebaseConfig";
import { ref, update } from "firebase/database";
import { useAuth0 } from "@auth0/auth0-react";
import TaskList from "../components/taskList/TaskList";

export interface TaskData {
  id: string;
  taskName: string;
  description: string;
  priority: string;
  assignee: string;
  duration: string;
  status: string;
}

interface ProjectDetails {
  projectName: string;
  projectDescription: string;
  projectStartDate: string;
  projectEndDate: string;
  projectOwner: string;
  projectStatus: string;
  invitedEmails: string[];
  taskData: TaskData[];
}

export interface PriorityIconMap {
  [key: string]: any;
}

const ProjectPage: React.FC = () => {
  const { projectName } = useParams<{ projectName: string }>();
  const [invitedEmails, setInvitedEmails] = useState<string[]>([]);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskData, setTaskData] = useState<TaskData[]>([]);
  const [progressData, setProgressData] = useState<TaskData[]>([]);
  const [completedData, setCompletedData] = useState<TaskData[]>([]);
  const taskListRef = useRef<HTMLDivElement>(null);
  const [projectKey, setProjectKey] = useState<string>("");
  const [projectDetails, setProjectDetails] = useState<ProjectDetails | null>(
    null
  );
  const priorityIconMap: PriorityIconMap = {
    high: <FaExclamationCircle color="red" />,
    medium: <FaRegCircle color="orange" />,
    low: <FaCircle color="green" />,
  };
  const { user } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://project-management-tool-2dcae-default-rtdb.firebaseio.com/${user?.name}.json`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch project details");
        }
        const data = await response.json();
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            const nestedObject = data[key];
            if (nestedObject.projectName === projectName) {
              setProjectDetails(nestedObject);
              setProjectKey(key);
              setTaskData(nestedObject.taskData || []);
              break;
            }
          }
        }
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };
    if (projectName) {
      fetchData();
    }
  }, [projectName]);

  useEffect(() => {
    // Save projectKey and other necessary data to localStorage
    if (projectKey && projectDetails) {
      localStorage.setItem("projectKey", projectKey);
      localStorage.setItem("projectDetails", JSON.stringify(projectDetails));
    }
  }, [projectKey, projectDetails]);

  useEffect(() => {
    // Fetch data from localStorage and update state
    const storedProjectKey = localStorage.getItem("projectKey");
    const storedProjectDetails = localStorage.getItem("projectDetails");
    if (storedProjectKey && storedProjectDetails) {
      setProjectKey(storedProjectKey);
      setProjectDetails(JSON.parse(storedProjectDetails));
      setTaskData(JSON.parse(storedProjectDetails).taskData || []);
    }
  }, []);

  const handleInvite = (email: string) => {
    setInvitedEmails((prevInvitedEmails) => [...prevInvitedEmails, email]);

    if (projectDetails && projectKey) {
      const projectRef = ref(database, `${user?.name}/${projectKey}`);
      const updatedProjectDetails = {
        ...projectDetails,
        invitedEmails: [...projectDetails.invitedEmails, email],
      };

      update(projectRef, updatedProjectDetails)
        .then(() => {
          console.log("Project details updated successfully.");
        })
        .catch((error) => {
          console.error("Error updating project details:", error);
        });
    }
  };

  const handleOpenTaskModal = () => {
    setIsTaskModalOpen(true);
  };

  const handleCloseTaskModal = () => {
    setIsTaskModalOpen(false);
  };

  const handleTaskSubmission = (newTaskData: TaskData) => {
    const updatedTaskData = [...taskData, newTaskData];
    setTaskData(updatedTaskData);

    if (projectKey && projectDetails) {
      const updatedProjectDetails = {
        ...projectDetails,
        taskData: updatedTaskData,
      };
      setProjectDetails(updatedProjectDetails);
      const projectRef = ref(database, `${user?.name}/${projectKey}`);

      update(projectRef, updatedProjectDetails)
        .then(() => {
          console.log("Task data updated successfully.");
        })
        .catch((error) => {
          console.error("Error updating task data:", error);
        });
    } else {
      console.error("Project key or project details is undefined.");
    }

    // Scroll to bottom
    if (taskListRef.current) {
      taskListRef.current.scrollTo({
        top: taskListRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Remove the task from the source droppable area
    let currentData,
      active = taskData,
      progress = progressData,
      complete = completedData;

    if (source.droppableId === "todo") {
      currentData = active[source.index];
      active.splice(source.index, 1);
    } else if (source.droppableId === "inProgress") {
      currentData = progress[source.index];
      progress.splice(source.index, 1);
    } else {
      currentData = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "todo") {
      active.splice(destination.index, 0, currentData);
    } else if (destination.droppableId === "inProgress") {
      progress.splice(destination.index, 0, currentData);
    } else {
      complete.splice(destination.index, 0, currentData);
    }

    setTaskData(active);
    setProgressData(progress);
    setCompletedData(complete);

    // Update the task's status based on the destination droppable area
    // switch (destination.droppableId) {
    //   case "todo":
    //     active = { ...draggedTask, status: "todo" };
    //     break;
    //   case "inProgress":
    //     updatedTask = { ...draggedTask, status: "inProgress" };
    //     break;
    //   case "done":
    //     updatedTask = { ...draggedTask, status: "done" };
    //     break;
    //   default:
    //     updatedTask = draggedTask;
    // }
  };

  return (
    <div
      className="flex justify-center items-center h-full p-10"
      style={{ width: "100%" }}
    >
      <div
        className="mx-auto bg-white justify-center h-screen items-center rounded-md shadow-md overflow-hidden"
        style={{ width: "200%" }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center gap-10">
            <h1 className="text-2xl text-blue-900 font-bold mb-4">
              {projectName}
            </h1>
            <button
              onClick={handleOpenTaskModal}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create Task
            </button>
          </div>
          <p className="mb-4 mt-4">
            {projectDetails ? projectDetails.projectDescription : ""}
          </p>
          <InviteForm onSubmit={handleInvite} />
        </div>
        <DragDropContext onDragEnd={handleDragEnd}>
          <TaskList
            taskData={taskData}
            progressData={progressData}
            completedData={completedData}
            taskListRef={taskListRef}
            priorityIconMap={priorityIconMap}
          />
        </DragDropContext>
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
