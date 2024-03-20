import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import InviteForm from "../components/invitePeople/InviteForm";
import TaskModal from "../components/projectForm/TaskModal";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { FaExclamationCircle, FaRegCircle, FaCircle } from "react-icons/fa";
import { database } from "../firebaseConfig";
import { ref } from "firebase/database";
import { useAuth0 } from "@auth0/auth0-react";

interface TaskData {
  id: string;
  taskName: string;
  description: string;
  priority: string;
  assignee: string;
  duration: string;
  status: string;
}

interface PriorityIconMap {
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
  const projectDetails = projectName ? localStorage.getItem(projectName) : null;
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
          `https://project-management-tool-2dcae-default-rtdb.firebaseio.com/${projectName}.json`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch project details");
        }

        const projectDetails = await response.json();
        if (projectDetails) {
          setInvitedEmails(projectDetails.invitedEmails || []);
          setTaskData(projectDetails.taskData || []);
        }
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };
    if (projectName) {
      fetchData();
    }
  }, [projectName]);

  const handleInvite = (email: string) => {
    setInvitedEmails((prevInvitedEmails) => [...prevInvitedEmails, email]);
    const db = database;

    if (projectName) {
      const projectRef = ref(db, user?.name);
      console.log(projectRef.key);
      // projectRef.child("invitedEmails").push(email);
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

    if (projectName) {
      const projectDetailsString = localStorage.getItem(projectName);
      if (projectDetailsString) {
        const existingProjectDetails = JSON.parse(projectDetailsString);
        const updatedLocalStorage = {
          ...existingProjectDetails,
          taskData: [...existingProjectDetails.taskData, newTaskData],
        };
        localStorage.setItem(projectName, JSON.stringify(updatedLocalStorage));
      }
    } else {
      console.error("Project name is undefined.");
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
            {projectDetails
              ? JSON.parse(projectDetails).projectDescription
              : ""}
          </p>
          <InviteForm onSubmit={handleInvite} />
        </div>
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-3 h-full mt-4 gap-4 mx-6 rounded-md">
            <Droppable droppableId="todo">
              {(provided) => (
                <div
                  className="col-span-1"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div
                    className="bg-gray-100 py-4 px-6"
                    style={{
                      maxHeight: "50vh",
                      overflowY: "auto",
                      width: "100%",
                      height: "100%",
                    }}
                    ref={taskListRef}
                  >
                    <h2 className="text-lg text-blue-900 font-semibold mb-4 border-b-2 border-gray-300 pb-2">
                      To Do:
                    </h2>
                    {taskData.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="bg-white relative shadow-md rounded-md p-4 mb-4">
                              <p className="font-semibold">
                                Task Name: {task.taskName}
                              </p>
                              <p>Description: {task.description}</p>
                              {/* <p>Priority: {task.priority}</p> */}
                              <p>Duration: {task.duration}</p>
                              <div className="absolute bottom-1 right-2">
                                {
                                  priorityIconMap[
                                    task.priority as keyof PriorityIconMap
                                  ]
                                }
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
            <Droppable droppableId="inProgress">
              {(provided) => (
                <div
                  className="col-span-1"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div
                    className="bg-gray-100 py-4 px-6"
                    style={{
                      maxHeight: "50vh",
                      overflowY: "auto",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <h2 className="text-lg text-blue-900 font-semibold mb-4 border-b-2 border-gray-300 pb-2">
                      In Progress:
                    </h2>
                    {progressData?.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="bg-white relative shadow-md rounded-md p-4 mb-4">
                              <p className="font-semibold">
                                Task Name: {task.taskName}
                              </p>
                              <p>Description: {task.description}</p>
                              <p>Duration: {task.duration}</p>
                              <div className="absolute bottom-1 right-2">
                                {
                                  priorityIconMap[
                                    task.priority as keyof PriorityIconMap
                                  ]
                                }
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
            <Droppable droppableId="done">
              {(provided) => (
                <div
                  className="col-span-1"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div
                    className="bg-gray-100 py-4 px-6"
                    style={{
                      maxHeight: "50vh",
                      overflowY: "auto",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <h2 className="text-lg text-blue-900 font-semibold mb-4 border-b-2 border-gray-300 pb-2">
                      Done:
                    </h2>
                    {completedData?.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="bg-white relative shadow-md rounded-md p-4 mb-4">
                              <p className="font-semibold">
                                Task Name: {task.taskName}
                              </p>
                              <p>Description: {task.description}</p>
                              <p>Duration: {task.duration}</p>
                              <div className="absolute bottom-1 right-2">
                                {
                                  priorityIconMap[
                                    task.priority as keyof PriorityIconMap
                                  ]
                                }
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          </div>
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
