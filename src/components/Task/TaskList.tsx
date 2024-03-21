import React, { useState } from "react";
import { TaskData } from "../../pages/Project";
import { PriorityIconMap } from "../../pages/Project";
import { Droppable, Draggable } from "react-beautiful-dnd";
import SubTaskModal from "./subTaskModal";
import { ProjectDetails } from "../projectForm/ProjectCreationForm";

interface TaskListProps {
  taskData: TaskData[];
  progressData: TaskData[];
  completedData: TaskData[];
  priorityIconMap: PriorityIconMap;
  taskListRef: React.RefObject<HTMLDivElement>;
}

const TaskList: React.FC<TaskListProps> = ({
  taskData,
  progressData,
  completedData,
  priorityIconMap,
  taskListRef,
}) => {
  const [selectedTask, setSelectedTask] = useState<TaskData | null>(null);
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);
  const [isInProgressModalOpen, setIsInProgressModalOpen] = useState(false);
  const [isDoneModalOpen, setIsDoneModalOpen] = useState(false);
  const projectDetails: ProjectDetails = localStorage.getItem("projectDetails");

  const openTodoModal = (task: TaskData) => {
    setSelectedTask(task);
    setIsTodoModalOpen(true);
  };

  const openInProgressModal = (task: TaskData) => {
    setSelectedTask(task);
    setIsInProgressModalOpen(true);
  };

  const openDoneModal = (task: TaskData) => {
    setSelectedTask(task);
    setIsDoneModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setIsTodoModalOpen(false);
    setIsInProgressModalOpen(false);
    setIsDoneModalOpen(false);
  };
  return (
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
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClick={() => openTodoModal(task)}
                    >
                      <div className="bg-white relative shadow-md rounded-md p-4 mb-4">
                        <p className="font-semibold">
                          Task Name: {task.taskName}
                        </p>
                        <p>Description: {task.description}</p>
                        {/* <p>Priority: {task.priority}</p> */}
                        <p>Duration: {task.duration} days</p>
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
              <SubTaskModal isOpen={isTodoModalOpen} onClose={closeModal}>
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                  <div className="bg-white rounded-lg w-1/2 p-8">
                    <div className="flex justify-between items-center border-b-2 pb-4">
                      <h2 className="text-lg font-semibold">Task Details</h2>
                      <button
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        onClick={closeModal}
                      >
                        &times;
                      </button>
                    </div>
                    <div className="mt-4">
                      <p className="mb-2">
                        <span className="font-semibold">Task Name:</span>{" "}
                        {selectedTask?.taskName}
                      </p>
                      <p className="mb-2">
                        <span className="font-semibold">Description:</span>{" "}
                        {selectedTask?.description}
                      </p>
                      <p className="mb-2">
                        <span className="font-semibold">Assignee:</span>{" "}
                        {selectedTask?.assignee}
                      </p>
                      <p className="mb-2">
                        <span className="font-semibold">Duration:</span>{" "}
                        {selectedTask?.duration}
                      </p>
                      <p className="mb-2">
                        <span className="font-semibold">Status:</span>{" "}
                        {selectedTask?.status}
                      </p>
                    </div>
                  </div>
                </div>
              </SubTaskModal>

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
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClick={() => openInProgressModal(task)}
                    >
                      <div className="bg-white relative shadow-md rounded-md p-4 mb-4">
                        <p className="font-semibold">
                          Task Name: {task.taskName}
                        </p>
                        <p>Description: {task.description}</p>
                        <p>Duration: {task.duration} days</p>
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
              <SubTaskModal isOpen={isInProgressModalOpen} onClose={closeModal}>
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                  <div className="bg-white rounded-lg p-8 w-3/4">
                    <div className="flex justify-between items-center border-b-2 pb-4">
                      <h2 className="text-2xl font-bold text-blue-900">
                        Task Details
                      </h2>
                      <button
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        onClick={closeModal}
                      >
                        <svg
                          className="w-6 h-6 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18.707 5.293a1 1 0 011.414 1.414L13.414 12l6.707 6.707a1 1 0 01-1.414 1.414L12 13.414l-6.707 6.707a1 1 0 01-1.414-1.414L10.586 12 3.879 5.293a1 1 0 111.414-1.414L12 10.586l6.707-6.707z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="mt-4">
                      <p className="text-lg mb-2 text-gray-800">
                        <span className="font-semibold text-blue-900">
                          Task Name:
                        </span>{" "}
                        {selectedTask?.taskName}
                      </p>
                      <p className="text-lg mb-2 text-gray-800">
                        <span className="font-semibold text-blue-900">
                          Description:
                        </span>{" "}
                        {selectedTask?.description}
                      </p>
                      <p className="text-lg mb-2 text-gray-800">
                        <span className="font-semibold text-blue-900">
                          Assignee:
                        </span>{" "}
                        {selectedTask?.assignee}
                      </p>
                      <p className="text-lg mb-2 text-gray-800">
                        <span className="font-semibold text-blue-900">
                          Duration:
                        </span>{" "}
                        {selectedTask?.duration}
                      </p>
                      <p className="text-lg mb-2 text-gray-800">
                        <span className="font-semibold text-blue-900">
                          Status:
                        </span>{" "}
                        {selectedTask?.status}
                      </p>
                    </div>
                  </div>
                </div>
              </SubTaskModal>

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
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClick={() => openDoneModal(task)}
                    >
                      <div className="bg-white relative shadow-md rounded-md p-4 mb-4">
                        <p className="font-semibold">
                          Task Name: {task.taskName}
                        </p>
                        <p>Description: {task.description}</p>
                        <p>Duration: {task.duration} days</p>
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
              <SubTaskModal isOpen={isDoneModalOpen} onClose={closeModal}>
                <div
                  className={`fixed z-10 inset-0 overflow-y-auto ${
                    isDoneModalOpen ? "block" : "hidden"
                  }`}
                >
                  <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div
                      className="fixed inset-0 transition-opacity"
                      aria-hidden="true"
                    >
                      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>

                    <span
                      className="hidden sm:inline-block sm:align-middle sm:h-screen"
                      aria-hidden="true"
                    >
                      &#8203;
                    </span>

                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        {/* Left side */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h1 className="text-xl font-bold text-gray-800">
                              {selectedTask?.taskName}
                            </h1>
                            <p className="text-lg text-gray-800">
                              {selectedTask?.description}
                            </p>
                            <p className="text-sm text-gray-600 mt-2">
                              activity
                            </p>

                            {/* Comment section */}
                            <div className="mt-4">
                              <h3 className="text-lg font-bold text-gray-800">
                                Comments
                              </h3>
                              {/* Render comments here */}
                              {/* Example: */}
                              {/* <p>Comment 1</p> */}
                              {/* <p>Comment 2</p> */}
                              {/* Add an input box for new comments */}
                              <input
                                type="text"
                                className="mt-2 border border-gray-300 p-2 w-full"
                                placeholder="Add a comment..."
                              />
                            </div>
                          </div>

                          {/* Right side */}
                          <div>
                            <h2 className="text-lg font-bold text-gray-800">
                              Details
                            </h2>
                            <p className="text-sm text-gray-600 mt-2">
                              Reporter: {projectDetails?.projectOwner}
                            </p>
                            <p className="text-sm text-gray-600">
                              Assignee: {selectedTask?.assignee}
                            </p>
                            {/* Add other details here */}
                            {/* Example: */}
                            {/* <p>Priority: {selectedTask?.priority}</p> */}
                            {/* <p>Parent: {selectedTask?.parent}</p> */}
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                          type="button"
                          onClick={closeModal}
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </SubTaskModal>

              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskList;
