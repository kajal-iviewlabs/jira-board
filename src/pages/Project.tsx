import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import InviteForm from "../components/Task/InviteForm";
import TaskModal from "../components/Task/TaskModal";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { FaExclamationCircle, FaRegCircle, FaCircle } from "react-icons/fa";
import { database } from "../firebaseConfig";
import { ref, update, onValue } from "firebase/database";
import { useAuth0 } from "@auth0/auth0-react";
import TaskList from "../components/Task/TaskList";
import { ProjectDetails } from "../components/projectForm/ProjectCreationForm";

export interface TaskData {
  id: string;
  taskName: string;
  description: string;
  priority: string;
  assignee: string;
  duration: string;
  status: string;
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
  }, [projectName, user?.name]);

  useEffect(() => {
    if (projectKey) {
      const projectRef = ref(database, `${user?.name}/${projectKey}`);
      const unsubscribe = onValue(projectRef, (snapshot) => {
        const projectData = snapshot.val();
        if (projectData) {
          setProjectDetails(projectData);
          setTaskData(projectData.taskData || []);
          setProgressData(projectData.inProgressData || []);
          setCompletedData(projectData.doneData || []);
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [projectKey, user?.name]);

  useEffect(() => {
    if (projectDetails) {
      localStorage.setItem("projectDetails", JSON.stringify(projectDetails));
    }
  }, [projectDetails]);

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
    console.log("Project Key:", projectKey);
    console.log("Project Details:", projectDetails);

    const updatedTaskData = [...taskData, newTaskData];
    setTaskData(updatedTaskData);

    if (projectKey && projectDetails) {
      const updatedProjectDetails = {
        ...projectDetails,
        taskData: [...updatedTaskData],
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

  const handleDragEnd = async (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    let updatedTaskData = [...taskData];
    let updatedProgressData = [...progressData];
    let updatedCompletedData = [...completedData];
    const draggedTask = updatedTaskData[source.index];

    // Remove the task from the source droppable area
    if (source.droppableId === "todo") {
      updatedTaskData.splice(source.index, 1);
    } else if (source.droppableId === "inProgress") {
      updatedProgressData.splice(source.index, 1);
    } else {
      updatedCompletedData.splice(source.index, 1);
    }

    // Add the task to the destination droppable area
    if (destination.droppableId === "todo") {
      draggedTask.status = "todo";
      updatedTaskData.splice(destination.index, 0, draggedTask);
    } else if (destination.droppableId === "inProgress") {
      draggedTask.status = "inProgress";
      updatedProgressData.splice(destination.index, 0, draggedTask);
    } else {
      draggedTask.status = "done";
      updatedCompletedData.splice(destination.index, 0, draggedTask);
    }

    // Update the state for all lists
    setTaskData(updatedTaskData);
    setProgressData(updatedProgressData);
    setCompletedData(updatedCompletedData);

    // Update Firebase data
    try {
      const projectRef = ref(database, `${user?.name}/${projectKey}`);
      const updatedProjectDetails = {
        ...projectDetails!,
        taskData: [...updatedTaskData],
        inProgressData: [...updatedProgressData],
        doneData: [...updatedCompletedData],
      };
      await update(projectRef, updatedProjectDetails);
      console.log("Firebase data updated successfully.");
    } catch (error) {
      console.error("Error updating Firebase data:", error);
    }
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
